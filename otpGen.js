function generateOTP() {
    var digits = "0123456789";
    var otp = "";
    for (var i = 0; i < 6; i++)
        otp += digits[Math.floor(Math.random() * 10)];
    return otp;
}

module.exports = {
    generateOTP,
}
