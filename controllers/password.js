const otpGenerator = require("otp-generator");
/**
 * Return a random string of a set length (10)
 */
function getOTP() {
  const otpLength = 10;
  const otp = otpGenerator.generate(otpLength, { specialChars: false });
  return otp;
}

module.exports = { getOTP };
