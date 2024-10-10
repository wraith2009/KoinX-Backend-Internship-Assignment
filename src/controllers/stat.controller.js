import { Crypto } from "../models/crypto.model.js";

const getStats = async (req, res) => {
  const { coin } = req.query;
  if (!coin) {
    return res.status(400).json({ error: "coin is required" });
  }
  console.log(coin);
  try {
    const latestData = await Crypto.findOne({ coin }).sort({
      createdAt: -1,
    });
    if (!latestData) return res.status(404).json({ error: "No data found" });

    return res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getStats;
