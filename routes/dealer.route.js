const Router = require('express').Router();
const { addCar, addDeal, soldVehicles } = require('../controllers/dealer.controller');
const { JWTVerification } = require('../utils/JWTVerification');

Router.route('/add/car').post(JWTVerification, addCar);
Router.route('/add/deal').post(JWTVerification, addDeal);
Router.route('/sold').get(JWTVerification, soldVehicles);

/*
/add/car [POST]
/add/deal [POST]
/sold [GET]
*/

module.exports = Router;
