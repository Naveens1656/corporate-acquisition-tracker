import { connectToDatabase } from '../../../lib/mongodb';
import Acquisition from '../../../models/Acquisition';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const acquisitions = await Acquisition.find({});
    res.status(200).json(acquisitions);
  } else if (req.method === 'POST') {
    const { acquirer, acquired, dealAmount, dealDate } = req.body;
    const newAcquisition = new Acquisition({ acquirer, acquired, dealAmount, dealDate });
    await newAcquisition.save();
    res.status(201).json(newAcquisition);
  } else {
    res.status(405).end();
  }
}
