/**
 * @file Creates schema for major collection and exports the mongoose model.
 * @author Vishnu Devarakonda
 */
const mongoose = require('mongoose');
const DB = require('./DBconsts');

const majorSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
});


module.exports = mongoose.model(DB.collections.Major.name, majorSchema);