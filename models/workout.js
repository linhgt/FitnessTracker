//Import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Workout schema
const Workout = new Schema({
    day:{
        type: Date,
        default: Date.now
    },
    exercises:[{
        type:{type:String, required:true},
        name:{type:String, required:true},
        distance: Number,
        duration: Number,
        weight: Number,
        sets: Number,
        reps: Number
    }]
})
