const { body } = require('express-validator');
const { login, register, logout, changePassword } = require('../controllers/auth.controller');
const { JWTVerification } = require('../utils/JWTVerification');

const Router = require('express').Router();

Router.route('/login').post(login);
Router.route('/register').post(
	[
		body('email').isEmail().withMessage('Invalid Email'),
		body('password').isLength({ min: 3 }).withMessage('Invalid Password'),
		body('type').isIn(['user', 'dealer']).withMessage('Invalid Type')
	],
	register
);
Router.route('/changepwd').put(
	JWTVerification,
	[
		body('newPassword').isLength({ min: 3 }).withMessage('Invalid password length'),
		body('type').isIn(['user', 'dealer']).withMessage('Invalid Type')
	],
	changePassword
);
Router.route('/logout').post(JWTVerification, logout);

/* 
/login [POST]
/register [POST]
/changepwd [PUT]
/logout [POST]
*/

module.exports = Router;
