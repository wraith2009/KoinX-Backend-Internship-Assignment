import axios from "axios";
import { Crypto } from "../models/crypto.model.js";
const COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price";

const coins = ["bitcoin", "matic-network", "ethereum"];

async function fetchCryptoData() {
  try {
    const { data } = await axios.get(COINGECKO_API, {
      params: {
        ids: coins.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    for (const coin of coins) {
      const cryptoData = {
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      };
      await Crypto.create(cryptoData);
    }
    console.log("Cryptocurrency data fetched and stored.");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

export default fetchCryptoData;
