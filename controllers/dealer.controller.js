exports.addCar = async (req, res) => {
	const { type, name, model, identification } = req.body;

	try {
		const db = req.dbClient.db('nervespark-cluster-1');
		const collection = db.collection('cars');

		await collection.insertOne({
			type: type,
			name: name,
			model: model,
			car_info: {
				identification: identification
			}
		});

		return res.status(200).json({ msg: 'success/Car Added' });
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};

exports.addDeal = async (req, res) => {
	const { car, price, buyer } = req.body;

	try {
		const db = req.dbClient.db('nervespark-cluster-1');
		const collection = db.collection('deal');

		await collection.insertOne({
			car_id: car,
			deal_info: {
				price: price,
				buyer: buyer
			}
		});
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};

exports.soldVehicles = async (req, res) => {
	try {
		const db = req.dbClient.db('nervespark-cluster-1');
		const soldVehiclesCollection = db.collection('sold_vehicles');
		const userCollection = db.collection('user');

		const users = await userCollection.find({}).toArray();
		await users?.map((user) => {
			console.log(user);
		});
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};
