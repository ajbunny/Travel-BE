const mongoose = require('mongoose');


const travelThingsSchema = new mongoose.Schema ({

    country: {type: String, require: true},
    date: {type: String, require: false},
    description: {type: String, require: true},
    
})



const Travel = mongoose.model('Travel', travelThingsSchema);
module.exports = Travel;