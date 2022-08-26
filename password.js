const { comparePassword } = require("./compare");
const { hasher } = require("./hash");
const { randomPassword } = require("./random");

const requestError = (reason) => {
  return JSON.stringify({
    message: "error",
    reason: `Error: Invalid Usage. Please check ${reason}`,
  });
};

async function handler(event) {
  try {
    const payload = JSON.parse(event.body);
  } catch (error) {
    return requestError(
      "the format of request body. JSON, XML and raw text supported"
    );
  }
  if (!payload.hasOwnProperty("action")) return requestError(`*action* key`);
  switch (payload.action) {
    case "hash":
      if (!payload.hasOwnProperty("password"))
        return requestError(`*password* key`);
      return hasher(payload.password, payload.salt);
    case "compare":
      if (
        !payload.hasOwnProperty("password") ||
        !payload.hasOwnProperty("hash")
      )
        return requestError(`*password* key or *hash* key`);
      return comparePassword(payload.password, payload.hash);
    case "random":
      if (!payload.hasOwnProperty("length"))
        return requestError(`*length* key is required`);
      if (payload.hasOwnProperty("casing")) {
        if (
          payload.casing.toLowerCase() !== "upper" &&
          payload.casing.toLowerCase() !== "lower"
        ) {
          return requestError(
            `only *upper* or *lower* is valid for *casing key*`
          );
        }
      }
      return randomPassword(
        payload.length,
        payload.pool,
        payload.casing,
        Boolean(payload.symbols)
      );
    default:
      return requestError(
        `Invalid usage. action: *hash* or *compare* or *random*`
      );
  }
}

module.exports = { handler };
