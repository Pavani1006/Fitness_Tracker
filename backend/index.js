const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const RecordModel = require('./model/Record')
const WorkoutModel = require('./model/Workouts');

const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
const PORT=3001
mongoose.connect('mongodb://localhost:27017/records');

app.post('/login', (req,res)=>{
    const {email,password} = req.body;
    RecordModel.findOne({email:email})
    .then(user => {
        if (user){
            console.log(user)
            if (user.password === password){
              res.json({ status: "Success", userId: user._id,username:user.name });
            }
            else{
              res.json("Password is incorrect")
            }
        }
        else{
            res.json("No such record exist")
        }
    })
    .catch(user =>{
        res.json("error")
    })
})
app.post('/signup', (req,res)=>{
    console.log(req.body);
    const { email } = req.body;
    RecordModel.findOne({ email: email })
    .then(user =>{
        if (user)
        {
            res.json("Exists")
        }
        else{
            RecordModel.create(req.body)
            .then(newUser =>{
                // res.json("created")
                res.json({ status: "Success", userId: newUser._id  ,username:newUser.name});
            })
            .catch(
                newUser =>{
                res.json("error")
            })
        }
    })
    .catch(user =>{
        res.json("error")
    })
})

app.post('/addworkout', (req, res) => {
  const { userId, date, steps, heartRate, weight } = req.body;
  WorkoutModel.create({ userId, date, steps, heartRate, weight })
      .then(workout => {
          res.json("Workout added successfully")
      })
      .catch(err => {
          res.json("error")
      });
});

app.post('/checkworkout', async (req, res) => {
    const { userId, date } = req.body;
    try {
        const workout = await WorkoutModel.findOne({ userId, date });
        if (workout) {
            res.status(200).json({ exists: true, workout });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error checking workout' });
    }
});


app.put('/updateworkout', async (req, res) => {
    const { userId, date, steps, heartRate, weight } = req.body;
    try {
        const workout = await WorkoutModel.findOneAndUpdate(
            { userId, date },
            { steps, heartRate, weight },
            { new: true }
        );
        if (workout) {
            res.status(200).json('Workout updated successfully');
        } else {
            res.status(404).json('Workout not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating workout' });
    }
});

app.post('/workouts', async (req, res) => {
    const { userId } = req.body;

    try {
        const workouts = await WorkoutModel.find({ userId });
        console.log(workouts);
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});