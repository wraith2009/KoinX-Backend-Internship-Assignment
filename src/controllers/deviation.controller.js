import { Crypto } from "../models/crypto.model.js";

const getDeviations = async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "Coin is required" });

  try {
    const prices = await Crypto.find({ coin })
      .sort({ createdAt: -1 })
      .limit(100)
      .select("price");
    if (prices.length < 2)
      return res.status(400).json({ error: "Not enough data" });

    const priceArray = prices.map((p) => p.price);
    const mean = priceArray.reduce((sum, p) => sum + p, 0) / priceArray.length;
    const variance =
      priceArray.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) /
      priceArray.length;
    const deviation = Math.sqrt(variance);

    return res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getDeviations;
