/**
 * @file Creates schema for class collection and exports the mongoose model.
 * @author Vishnu Devarakonda
 */
const mongoose = require('mongoose');
const DB = require('./DBconsts');

 const classSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
});


module.exports = mongoose.model(DB.collections.Class.name, classSchema);