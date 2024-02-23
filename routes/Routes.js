const Router = require('express').Router();

const AuthRouter = require('./auth.route');
const CommonFuncRoute = require('./common.funcs.route');
const UserRoute = require('./user.route');
const DealerRoute = require('./dealer.route');

Router.use('/auth', AuthRouter);
Router.use('/ud', CommonFuncRoute);
Router.use('/user', UserRoute);
Router.use('/dealer', DealerRoute);

/*
    /auth - To auth actions
    /ud - The actions common to user and dealer - Create common REST endpoints for both user and dealership: 
    /user - To user actions - Create REST endpoints for user
    /dealer - to dealer actions - Create REST endpoints for dealership
*/

module.exports = Router;
