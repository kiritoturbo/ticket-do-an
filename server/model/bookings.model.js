const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const moment = require("moment");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    pnr: { type: String, default: () => nanoid(6).toUpperCase(6) },
    buyerName: String,
    buyerId: String,
    phoneNumber: String,
    email: String,
    address: String,
    dateOfBirth: Date,
    nationality: String,
    tickets: [{ type: mongoose.Types.ObjectId, ref: "Tickets" }],
    totalPrice: Number,
    additional: Schema.Types.Mixed,
    paymentMethod: {
      type: String,
      enum: ["creditCard", "vnPay"],
      required: true,
    },
    status: Boolean,
    verifyUser: Boolean,
    noteAdmin: String,
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Bookings", bookingSchema, "Bookings");

module.exports = {
  create: (booking) => {
    return bookingModel.create(booking);
  },
  find: (query) => {
    return bookingModel.find(query).populate({
      path: "tickets",
      populate: {
        path: "flightId",
        populate: {
          path: "startFrom destination",
        },
      },
    });
  },
  findById: (_id) => {
    return bookingModel.findById(_id).populate({
      path: "tickets",
      populate: {
        path: "flightId",
        populate: {
          path: "startFrom destination",
        },
      },
    });
  },
  update: async (_id, data) => {
    let booking = await bookingModel.findOne({ _id: _id });
    Object.assign(booking, data);
    return booking.save();
  },
  updateVerifyUser: async (pnr) => {
    console.log(pnr.pnr);
    try {
      // Tìm kiếm và cập nhật tài liệu
      const updatedBooking = await bookingModel.findOneAndUpdate(
        { pnr: pnr.pnr }, // Điều kiện tìm kiếm theo trường PNR
        { $set: { verifyUser: true } }, // Cập nhật trường verifyUser thành true
        { new: true } // Tùy chọn để trả về tài liệu sau khi cập nhật
      );

      if (!updatedBooking) {
        console.log(`Không tìm thấy booking với PNR: ${pnr}`);
        return null;
      }

      console.log(`Đã cập nhật verifyUser cho booking với PNR: ${pnr}`);
      return updatedBooking;
    } catch (error) {
      console.error("Lỗi khi cập nhật verifyUser:", error);
      throw error;
    }
  },
  delete: (_id) => {
    return bookingModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return bookingModel
      .find()
      .populate({
        path: "tickets",
        populate: {
          path: "flightId",
          populate: {
            path: "startFrom destination",
          },
        },
      })
      .limit(perPage)
      .skip(perPage * page)
      .lean();
  },
  searchByFlight: (flightId) => {
    const agg = [
      {
        $lookup: {
          from: "Tickets",
          localField: "tickets",
          foreignField: "_id",
          as: "tickets",
        },
      },
      {
        $unwind: {
          path: "$tickets",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "tickets.flightId": mongoose.Types.ObjectId(flightId),
        },
      },
      {
        $lookup: {
          from: "Flights",
          localField: "tickets.flightId",
          foreignField: "_id",
          as: "tickets.flightId",
        },
      },
      {
        $unwind: {
          path: "$tickets.flightId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "Airports",
          localField: "tickets.flightId.startFrom",
          foreignField: "_id",
          as: "tickets.flightId.startFrom",
        },
      },
      {
        $lookup: {
          from: "Airports",
          localField: "tickets.flightId.destination",
          foreignField: "_id",
          as: "tickets.flightId.destination",
        },
      },
      {
        $unwind: {
          path: "$tickets.flightId.startFrom",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$tickets.flightId.destination",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          pnr: { $first: "$pnr" },
          buyerName: { $first: "$buyerName" },
          buyerId: { $first: "$buyerId" },
          phoneNumber: { $first: "$phoneNumber" },
          email: { $first: "$email" },
          address: { $first: "$address" },
          dateOfBirth: { $first: "$dateOfBirth" },
          nationality: { $first: "$nationality" },
          totalPrice: { $first: "$totalPrice" },
          additional: { $first: "$additional" },
          paymentMethod: { $first: "$paymentMethod" },
          status: { $first: "$status" },
          verifyUser: { $first: "$verifyUser" },
          tickets: { $push: "$tickets" },
          noteAdmin: { $first: "$noteAdmin" },
          updatedAt: { $first: "$updatedAt" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ];
    return bookingModel.aggregate(agg);
  },
  getTicketsCountByDay: async (date) => {
    try {
      // Thiết lập thời điểm bắt đầu và kết thúc của ngày
      const startOfDay = moment(date).startOf("day").toDate();
      const endOfDay = moment(date).endOf("day").toDate();

      // Sử dụng aggregation để đếm số vé đã đặt trong ngày đã chỉ định
      const result = await bookingModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        // {
        //   $unwind: "$tickets",
        // },
        {
          $group: {
            _id: "_id", // Thêm _id vào để giữ nguyên _id của booking
            totalTickets: { $sum: 1 },
          },
        },
      ]);

      if (result.length > 0) {
        return result[0].totalTickets;
      } else {
        return 0; // No tickets booked on the specified day
      }
    } catch (error) {
      console.error("Error retrieving ticket count:", error);
      throw error;
    }
  },
  getTicketsCountByMonth: async (month, year) => {
    try {
      // Thiết lập thời điểm bắt đầu và kết thúc của tháng
      const startOfMonth = moment({ year, month: month - 1 })
        .startOf("month")
        .toDate();
      const endOfMonth = moment({ year, month: month - 1 })
        .endOf("month")
        .toDate();

      // Sử dụng aggregation để đếm số vé đã đặt trong tháng đã chỉ định
      const result = await bookingModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        // {
        //   $unwind: "$tickets",
        // },
        {
          $group: {
            _id: "", // Thêm _id vào để giữ nguyên _id của booking
            totalTickets: { $sum: 1 },
          },
        },
      ]);

      if (result.length > 0) {
        return result[0].totalTickets;
      } else {
        return 0; // Không có vé nào được đặt trong tháng đã chỉ định
      }
    } catch (error) {
      console.error("Lỗi khi lấy số liệu vé theo tháng:", error);
      throw error;
    }
  },

  getTicketsCountByYear: async (year) => {
    try {
      // Thiết lập thời điểm bắt đầu và kết thúc của năm
      const startOfYear = moment({ year }).startOf("year").toDate();
      const endOfYear = moment({ year }).endOf("year").toDate();

      // Sử dụng aggregation để đếm số vé đã đặt trong năm đã chỉ định
      const result = await bookingModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfYear, $lte: endOfYear },
          },
        },
        // {
        //   $unwind: "$tickets",
        // },
        {
          $group: {
            _id: "$bookingId", // Thêm _id vào để giữ nguyên _id của booking
            totalTickets: { $sum: 1 },
          },
        },
      ]);
      if (result.length > 0) {
        return result[0].totalTickets;
      } else {
        return 0; // Không có vé nào được đặt trong năm đã chỉ định
      }
    } catch (error) {
      console.error("Lỗi khi lấy số liệu vé theo năm:", error);
      throw error;
    }
  },

  getTotalRevenueByDay: async (date) => {
    try {
      // Thiết lập thời điểm bắt đầu và kết thúc của ngày
      const startOfDay = moment(date).startOf("day").toDate();
      const endOfDay = moment(date).endOf("day").toDate();

      // Sử dụng aggregation để tính tổng số tiền của các vé đã đặt trong ngày đã chỉ định
      const result = await bookingModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $group: {
            _id: null, // Thêm _id vào để giữ nguyên _id của booking
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
      ]);

      if (result.length > 0) {
        return result[0].totalRevenue;
      } else {
        return 0; // Không có vé nào được đặt trong ngày đã chỉ định
      }
    } catch (error) {
      console.error("Lỗi khi lấy tổng số tiền vé trong ngày:", error);
      throw error;
    }
  },
  getTotalRevenueByMonth: async (month, year) => {
    try {
      // Thiết lập thời điểm bắt đầu và kết thúc của tháng
      const startOfMonth = moment({ year, month: month - 1 })
        .startOf("month")
        .toDate();
      const endOfMonth = moment({ year, month: month - 1 })
        .endOf("month")
        .toDate();

      // Sử dụng aggregation để tính tổng số tiền của tất cả các đặt vé trong tháng đã chỉ định
      const result = await bookingModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: "", // Thêm _id vào để giữ nguyên _id của booking
            totalRevenue: { $sum: "$totalPrice" }, // Sử dụng trường totalPrice từ mỗi đặt vé
          },
        },
      ]);

      if (result.length > 0) {
        return result[0].totalRevenue;
      } else {
        return 0; // Không có đặt vé nào trong tháng đã chỉ định
      }
    } catch (error) {
      console.error("Lỗi khi lấy tổng số tiền vé trong tháng:", error);
      throw error;
    }
  },
};
