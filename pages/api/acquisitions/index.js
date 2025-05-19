import { connectToDatabase } from '../../../lib/mongodb';
import Acquisition from '../../../models/Acquisition';

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    if (req.method === 'GET') {
      const acquisitions = await Acquisition.find({}).sort({ dealDate: -1 });
      res.status(200).json(acquisitions);
    } else if (req.method === 'POST') {
      const { acquirer, acquired, dealAmount, dealDate } = req.body;

      if (!acquirer || !acquired || !dealAmount || !dealDate) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const parsedAmount = parseFloat(dealAmount);
      const parsedDate = new Date(dealDate);

      if (isNaN(parsedAmount) || isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid number or date.' });
      }

      const newAcquisition = new Acquisition({
        acquirer,
        acquired,
        dealAmount: parsedAmount,
        dealDate: parsedDate,
      });

      await newAcquisition.save();
      res.status(201).json(newAcquisition);
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
}
