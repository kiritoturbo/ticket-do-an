// import Hotel from '../models/Hotel'
// import Room from '../models/Room';
const Hotel = require("../model/Hotel");
const Room = require("../model/Room");

module.exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.getAllHotell = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  console.log(req.query);

  try {
    // Chuyển giá trị của limit từ chuỗi sang số nguyên
    const parsedLimit = parseInt(limit);

    // Kiểm tra xem parsedLimit có phải là một số hợp lệ không
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      // Nếu parsedLimit không phải là số nguyên hợp lệ, hoặc là số âm, không sử dụng .limit()
      const hotels = await Hotel.find(others).exec();
      res.status(200).json(hotels);
    } else {
      // Nếu parsedLimit là một số nguyên hợp lệ, sử dụng .limit(parsedLimit)
      const hotels = await Hotel.find(others).limit(parsedLimit).exec();
      res.status(200).json(hotels);
    }
  } catch (err) {
    next(err);
  }
};
module.exports.countByCity = async (req, res, next) => {
  const cities = req.query?.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getHotelRooms = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
