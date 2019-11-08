const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    rating: {type: String},
    image: {type: String},
    location: {type: String},
    height: {type: Number},
    anchors: {type: String},
    bolts: {type: Number},
    rockType: {type: String}
}, {timestamp: true})

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
