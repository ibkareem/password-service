const chance = require("chance").Chance;

async function randomPassword(length, pool, casing, symbols) {
  return JSON.stringify({
    message: "success",
    data: new chance().string({
      length: length,
      pool: pool,
      casing: casing,
      symbols: symbols,
    }),
  });
}

module.exports = { randomPassword };
