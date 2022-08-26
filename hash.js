const bcrypt = require("bcryptjs");

async function hasher(password, salt = 8) {
  if (Number(salt) > 10)
    return JSON.stringify({ Error: "Max Salt rounds passed" });
  let secureSalt = await bcrypt.genSalt(Number(salt));
  return JSON.stringify({
    message: "success",
    data: await bcrypt.hash(password, secureSalt),
  });
}

module.exports = { hasher };
