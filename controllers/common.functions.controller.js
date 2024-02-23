exports.allCars = async (req, res) => {
	try {
		const db = req.dbClient.db('nervespark-cluster-1');
		const carsCollection = db.collection('cars');
		const dealershipsCollection = db.collection('dealership');

		const cars = await carsCollection
			.aggregate([
				{
					$lookup: {
						from: 'dealership',
						localField: 'dealership_id',
						foreignField: 'dealership_id',
						as: 'dealership_info'
					}
				}
			])
			.toArray();

		return res.status(200).json({ msg: 'success/fetch-cars', cars: cars });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};
