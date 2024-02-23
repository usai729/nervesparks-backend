const {
  allCars,
  carsOfDealer,
  dealsOfDealer,
  transac,
} = require("../controllers/common.functions.controller");

const Router = require("express").Router();

Router.route("/cars").get(allCars);
Router.route("/cars/:dealer").get(carsOfDealer);
Router.route("/deals/:dealer").get(dealsOfDealer);
Router.route("/transac").post(transac);

/*
/cars [GET]
/cars/:dealer [GET]
/deals/:dealer [GET]
/transac?car=&dealer= [POST]
*/

module.exports = Router;
