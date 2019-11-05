const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    location: {type: String},
    height: {type: Number},
    anchors: {type: String},
    bolts: {type: Number},
    rockType: {type: String},
}, {timestamp: true})

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
