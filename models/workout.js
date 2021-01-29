//Import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Workout schema
const WorkoutSchema = new Schema({
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

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;