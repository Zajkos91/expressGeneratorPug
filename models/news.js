const mongoose = require('mongoose');
const {Schema} = mongoose;

const newsSchema = new Schema({
    title: {type:String, required: [true, 'Title field is required']}, // String is shorthand for {type: String}
    description: {type: String, required: [true, 'Description field is required']},
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('News', newsSchema);
