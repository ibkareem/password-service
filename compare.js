const bcrypt = require("bcryptjs");

async function comparePassword(password, hash) {
  return JSON.stringify({
    message: "success",
    data: await bcrypt.compare(password, hash),
  });
}

module.exports = { comparePassword };
