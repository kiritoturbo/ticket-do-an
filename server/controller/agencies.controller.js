const agenciesModel = require("../model/agencies.model");
const validation = require("../helper/verify.helper");

module.exports = {
  addAgen: (req, res) => {
    agenciesModel
      .create(req.body)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ errors: e });
      });
  },

  updateAgen: (req, res) => {
    const agencyId = req.params.id;
    const updatedData = req.body;

    agenciesModel
      .update(agencyId, updatedData)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ error: "Agency not found" });
        }
        res.json(result);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ errors: e });
      });
  },

  deleteAgen: (req, res) => {
    const agencyId = req.params.id;

    agenciesModel
      .delete(agencyId)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ error: "Agency not found" });
        }
        res.json({ message: "Xóa đại lý thành công" });
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ errors: e });
      });
  },

  findAgen: (req, res) => {
    const query = req.query; // Lấy thông tin tìm kiếm từ query parameters

    agenciesModel
      .findAll(query)
      .then((result) => {
        res.json(result);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ errors: e });
      });
  },
  findbyId: (req, res) => {
    const param = req.params.id;
    agenciesModel
      .findById(param)
      .then((result) => {
        res.json(result);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ errors: e });
      });
  },
};
