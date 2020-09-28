const mongoose = require("mongoose");

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
    email: String
});

module.exports.Message = mongoose.model('messagecontents', whatsappSchema);