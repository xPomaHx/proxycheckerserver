var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var proxySchema = new Schema({
    ipport: {
        type: String,
        unique: true,
        required: true
    },
    ip: String,
    port: Number,
    protocol: String,
    supportsHttps: Boolean,
    pickabu: Boolean,
    lock: {
        type: Boolean,
        default: false,
    },
    good: [{
        date: Date
    }],
    bad: [{
        date: Date
    }],
    anonymityLevel: Number,
    date: Date,
});
module.exports = mongoose.model('Proxy', proxySchema);