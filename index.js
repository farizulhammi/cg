const fetch = require("node-fetch");
const getIdBySymbol = async function (symbol) {
  const api = "https://api.coingecko.com/api/v3/search?query=";
  const a = fetch(api + symbol, {
    headers: {
      accept: "application/json",
    },
  });
  try {
    let data = await a;
    const getId = await data.json();
    return getId.coins[0].id;
  } catch (err) {
    console.log(err);
  }
};

const getPriceById = async function (symbol, getId) {
  const id = await getId(symbol);
  const apiPrice = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;
  const aa = fetch(apiPrice, {
    headers: {
      accept: "application/json",
    },
  });
  try {
    let data = await aa;
    const getPrice = await data.json();
    const detailData = "getPrice." + id;
    return eval(detailData);
  } catch (err) {
    console.log(err);
  }
};

async function getPrice(symbol) {
  const data = {};
  data.market = await getPriceById(symbol, getIdBySymbol);
  data.market.usd_market_cap = Math.round(data.market.usd_market_cap);
  data.market.usd_24h_vol = Math.round(data.market.usd_24h_vol);
  data.market.usd_24h_change = Math.round(data.market.usd_24h_change);
  return data;
}
(async () => {
  console.log((await getPrice("sol")).market);
})();
