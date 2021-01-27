const mongoJs = require("mongojs");
const router = require("express").Router();
const db = require("../models/index.js");

//return all workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(workoutdb => {
        res.json(workoutdb);
    })
    .catch(err => {
         res.json(err);
    });
});

//Return the last 7 workouts 
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {$sort: {_id:1}},
      { $limit : 7 },
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" }
        }
      }
    ]).then(workoutdb => {
      res.json(workoutdb);
    })
    .catch(err => {
      res.json(err);
    });
  });

//Add an exercise to the workout
router.put("/api/workouts/:id", (req, res) => {
    let workoutId = req.params.id;
    // handle complete bug
    if (req.body.name.trim().length <= 0) {
        return res.end;
    } else {
        db.Workout.findByIdAndUpdate(workoutId, {
                $push: {
                    exercises: req.body
                }
            })
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// add a new workout
router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
