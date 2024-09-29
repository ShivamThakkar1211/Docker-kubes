const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

const Queries = mongoose.model('Queries', querySchema);
module.exports = Queries;
