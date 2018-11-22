const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {type: String, requiere: true},
    phone: {type: String, requiere: true},
    address: {type: String},    
    date: {type: Date, default: Date.now},
    user: {type: String}
});

module.exports = mongoose.model('Contact', ContactSchema);