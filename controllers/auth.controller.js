const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const bcyrpt = require('bcrypt');
const _ = require('dotenv').config();
const { validationResult } = require('express-validator');

var response = {
	msg: ''
};
const msgs = {
	ise: 'err/Internal Server Error',
	br: 'err/Bad Request',
	unauthorized: 'err/Unauthorized Access'
};
const date = new Date();

exports.login = async (req, res) => {
	const { email, password, type } = req.body;
	const errors = validationResult(req);

	const db = req.dbClient.db('nervespark-cluster-1');
	const collection = db.collection(type === 'user' ? 'user' : 'dealership');

	if (!errors.isEmpty()) {
		response.msg = msgs.br;
		response.errors = errors;
		return res.status(400).json(response);
	}

	try {
		const userOrDealer = await collection.findOne({
			[type === 'user' ? 'user_email' : 'dealership_email']: email
		});

		if (!userOrDealer) {
			return res.status(401).json({ msg: 'err/User Not Found' });
		}

		const verifyPassword = await bcyrpt.compare(password, userOrDealer.password);

		if (!verifyPassword) {
			return res.status(401).json({ msg: 'Invalid Password!' });
		}

		const token = jwt.sign(
			{
				id: userOrDealer._id,
				milli: date.getMilliseconds() //Just in case to avoid same tokens
			},
			process.env.SECRET_JWT
		);

		response.msg = 'success/User Logged in';
		response.token = token;
		return res.status(200).json(response);
	} catch (e) {
		console.error(e);

		response.msg = msgs.ise;
		return res.status(500).json(response);
	}
};

exports.register = async (req, res) => {
	const { type, email, password, location } = req.body;
	var dname;

	const errors = validationResult(req);

	const db = req.dbClient.db('nervespark-cluster-1');
	const collection = db.collection(type === 'user' ? 'user' : 'dealership');

	if (!errors.isEmpty()) {
		response.msg = 'err/Validation error';
		response.errors = errors.array();

		return res.status(400).json(response);
	}

	if (type === 'dealer') {
		dname = req.body.dname;

		if (!dname) {
			response.msg = 'err/Invalid Dealer Name';
			return res.status(400).json(response);
		}
	}

	try {
		const exists = await collection.findOne({ user_email: email });

		if (exists) {
			response.msg = 'err/Email already registered';

			return res.status(409).json(response);
		}

		const salt = await bcyrpt.genSalt();
		const hash = await bcyrpt.hash(password, salt);

		const data =
			type === 'user'
				? {
						user_id: uuid.v1(),
						user_email: email,
						password: hash,
						location: location,
						vehicle_info: []
					}
				: {
						dealership_id: uuid.v1(),
						dealership_email: email,
						dealership_name: dname,
						password: hash,
						dealership_location: location,
						cars: [],
						deals: [],
						sold_vehicles: []
					};

		const query = await collection.insertOne(data);

		const token = jwt.sign(
			{
				id: query._id,
				milli: date.getMilliseconds() //Just in case to avoid same tokens
			},
			process.env.SECRET_JWT
		);

		response.msg = 'sucess/User Registered';
		response.token = token;
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);

		response.msg = msgs.ise;
		return res.status(500).json(response);
	}
};

exports.changePassword = async (req, res) => {
	const { currentPassword, newPassword, type } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		response.msg = msgs.br;
		response.errors = errors.array();

		return res.status(400).json(response);
	}

	try {
		const userId = req.user.id;

		const db = req.dbClient.db('nervespark-cluster-1');
		const collection = db.collection(type === 'user' ? 'user' : 'dealership');

		if (!user) {
			return res.status(404).json({ msg: 'err/User Not Found' });
		}

		const verifyPassword = await bcyrpt.compare(currentPassword, user.password);

		if (!verifyPassword) {
			return res.status(401).json({ msg: 'err/Invalid Current Password' });
		}

		const newSalt = await bcyrpt.genSalt();
		const newHash = await bcyrpt.hash(newPassword, newSalt);

		await collection.updateOne({ _id: userId }, { $set: { password: newHash } });

		response.msg = 'success/Password Changed';
		return res.status(200).json(response);
	} catch (e) {
		console.error(e);

		response.msg = msgs.ise;
		return res.status(500).json(response);
	}
};

exports.logout = async (req, res) => {
	const { token } = req.headers;

	if (!token) {
		response.msg = 'Token is missing';
		return res.status(403).json(response);
	}

	try {
		const db = req.dbClient.db('nervespark-cluster-1');
		const collection = db.collection('blacklist_tokens');

		const existingToken = await collection.findOne({ token: token });

		if (!existingToken) {
			await collection.insertOne({ token: token });
		}

		return res.status(200).json({ msg: 'success/logout' });
	} catch (e) {
		console.log(e);
		response.msg = msgs.ise;
		return res.status(500).json(response);
	}
};
