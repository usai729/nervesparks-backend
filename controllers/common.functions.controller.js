const { ObjectId } = require("mongodb");

exports.allCars = async (req, res) => {
  try {
    const db = req.dbClient.db("nervespark-cluster-1");
    const carsCollection = db.collection("cars");
    const dealershipsCollection = db.collection("dealership");

    const cars = await carsCollection
      .aggregate([
        {
          $lookup: {
            from: "dealership",
            localField: "dealership_id",
            foreignField: "dealership_id",
            as: "dealership_info",
          },
        },
      ])
      .toArray();

    return res.status(200).json({ msg: "success/fetch-cars", cars: cars });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "err/Internal Server Error" });
  }
};

exports.carsOfDealer = async (req, res) => {
  const { dealer } = req.body;

  try {
    const db = req.dbClient.db("nervespark-cluster-1");
    const dealershipCollection = db.collection("dealership");
    const carsCollection = db.collection("cars");

    const dealer_mongo = await dealershipCollection.findOne({
      id: dealer,
    });

    if (!dealer_mongo) {
      return res.status(404).json({ message: "err/Dealer not found" });
    }

    const carIds = dealer_mongo.cars.map((carid) => new ObjectId(carid));
    const cars_mongo = await Promise.all(
      carIds.map((carId) => carsCollection.findOne({ _id: carId }))
    );

    return res.status(200).json({ car: cars_mongo, dealer: dealer_mongo });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "err/Internal Server Error" });
  }
};

exports.dealsOfDealer = async (req, res) => {
  const { dealer } = req.body;

  try {
    const db = req.dbClient.db("nervespark-cluster-1");
    const dealershipCollection = db.collection("dealership");
    const carsCollection = db.collection("deal");

    const dealer_mongo = await dealershipCollection.findOne({
      id: dealer,
    });

    if (!dealer_mongo) {
      return res.status(404).json({ message: "err/Dealer not found" });
    }

    const dealsIds = dealer_mongo.deals.map((dealid) => new ObjectId(dealid));
    const deals_mongo = await Promise.all(
      dealsIds.map((dealid) => carsCollection.findOne({ _id: dealid }))
    );

    return res
      .status(200)
      .json({ msg: "err/fetched", car: deals_mongo, dealer: dealer_mongo });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "err/Internal Server Error" });
  }
};

//Not tested
exports.transac = async (req, res) => {
  const { car, dealer } = req.query;

  try {
    const dealershipCollection = db.collection("dealership");
    const dealsCollection = db.collection("deal");
    const usersCollection = db.collection("user");
    const soldVehiclesCollection = db.collection("sold_vehicles");

    const deal = await dealsCollection.findOne({ car_id: car });

    if (!deal) {
      return res.status(404).json({ msg: "err/Deal not found" });
    }

    await dealershipCollection.updateOne(
      { dealership_id: dealer },
      { $push: { sold_vehicles: deal.vehicle_id } }
    );

    await usersCollection.updateOne({
      $push: { vehicle_info: deal.vehicle_id },
    });

    await soldVehiclesCollection.insertOne({
      vehicle_id: deal.vehicle_id,
      car_id: deal.car_id,
      vehicle_info: deal.deal_info,
    });

    return res
      .status(200)
      .json({ msg: "success/Transaction completed successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "err/Internal Server Error" });
  }
};
