const { ObjectId } = require('mongodb');

exports.dealers = async (req, res) => {
	const { car } = req.params;

	try {
		const db = req.dbClient.db('nervespark-cluster-1');
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};

exports.cars = async (req, res) => {
	var data = [];

	try {
		const db = req.dbClient.db('nervespark-cluster-1');

		const userInfo = await db.collection('user').findOne({ _id: new ObjectId(req.user.id) });

		const cars = await Promise.all(
			userInfo.vehicle_info.map(async (vehicle_id) => {
				return await db.collection('cars').findOne({ _id: new ObjectId(vehicle_id) });
			})
		);
		const dealers = await Promise.all(
			cars.map(async (car) => {
				return await db
					.collection('dealership')
					.findOne({ 'cars._id': { $elemMatch: { _id: car._id } } });
			})
		);

		return res.status(200).json({ cars, dealers });
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};

exports.deals = async (req, res) => {
	const { car } = req.params;

	try {
		const db = req.dbClient.db('nervespark-cluster-1');

		const deals = await db.collection('deal').find({ car_id: car }).toArray();

		return res.status(200).json({ msg: 'success/cars', deals });
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};
