const { allCars } = require('../controllers/common.functions.controller');

const Router = require('express').Router();

Router.route('/cars').get(allCars);
Router.route('/cars/:dealer');
Router.route('/deals/:dealer');
Router.route('/transac');

/*
/cars [GET]
/cars/:dealer [GET]
/deals/:dealer [GET]
*/

module.exports = Router;
