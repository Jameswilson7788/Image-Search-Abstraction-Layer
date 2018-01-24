var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    tern: String,
    Date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('log', logSchema);