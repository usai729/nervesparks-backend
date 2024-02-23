const jwt = require('jsonwebtoken');
const _ = require('dotenv').config();

exports.JWTVerification = async (req, res, next) => {
	const { token } = req.headers;

	const db = req.dbClient.db('nervespark-cluster-1');
	const collection = db.collection('blacklist_tokens');

	if (!token) {
		return res.status(401).json({ msg: 'err/Token Not Found' });
	}

	try {
		const existsInBlacklist = await collection.findOne({ token: token });

		if (existsInBlacklist) {
			return res.status(401).json({ msg: 'err/Invalid Token' });
		}

		const verification = jwt.verify(token, process.env.SECRET_JWT);

		if (!verification) {
			return res.status(401).json({ msg: 'err/Invalid Token' });
		}

		req.user = verification;
		next();
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'err/Error Verifying Token' });
	}
};
