const { cars, deals } = require('../controllers/user.controller');
const { JWTVerification } = require('../utils/JWTVerification');

const Router = require('express').Router();

Router.route('/dealers/:car');
Router.route('/cars').get(JWTVerification, cars);
Router.route('/deals/:car').get(deals);

/*
    /dealer/:car [GET]
    /cars [GET]
    /deals/:car [GET]
*/

module.exports = Router;
