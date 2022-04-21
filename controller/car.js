const { Cars } = require("../models");

module.exports = class {
  static addCars(req, res, next) {
    Cars.create({
      car_name: req.body.car_name,
      rent_cost: req.body.rent_cost,
      size: req.body.size,
      car_image: req.body.car_image,
    })
      .then((result) => {
        res.status(201).send({
          status: 201,
          message: "New car created",
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  static getAllCars(req, res, next) {
    Cars.findAll()
      .then((result) => {
        res.render("cars/index", { ListCars : result });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  static updateCars(req, res, next) {
    const id = req.params.id;
    Cars.update(req.body, {
      where: { id: id },
    })
      .then((result) => {
        if (result == 1) {
          res.status(201).send({
            status: 201,
            message: "post was updated",
            data: result,
          });
        } else {
          res.send({
            message: `cannot update id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  static deleteCars(req, res, next) {
    const id = req.params.id;
    Cars.destroy({
      where: { id: id },
    })
      .then((result) => {
        if (result == 1) {
          res.status(201).send({
            status: 201,
            message: "post waas deleted",
            data: result,
          });
        } else {
          res.send({
            message: `cannot delete id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
