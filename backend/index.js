
require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const RecordModel = require('./model/Record');
const WorkoutModel = require('./model/Workouts');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    RecordModel.findOne({ email })
        .then(user => {
            if (user) {
                console.log(user);
                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            res.json({ status: "Success", userId: user._id, username: user.name });
                        } else {
                            res.json("Password is incorrect");
                        }
                    });
            } else {
                res.json("No such record exist");
            }
        })
        .catch(err => {
            console.error("Error during login:", err);
            res.status(500).json("Error during login");
        });
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    RecordModel.findOne({ email })
        .then(user => {
            if (user) {
                res.json("Exists");
                return; 
            }
            return bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    console.log("Hashed Password:", hashedPassword);
                    return RecordModel.create({
                        name,
                        email,
                        password: hashedPassword
                    });
                });
        })
        .then(newUser => {
            if (newUser) {
                res.json({ status: "Success", userId: newUser._id, username: newUser.name });
            }
        })
        .catch(err => {
            console.error("Error during signup:", err);
            res.status(500).json("Error creating user");
        });
});

app.post('/addworkout', (req, res) => {
    const { userId, date, steps, heartRate, weight } = req.body;
    WorkoutModel.create({ userId, date, steps, heartRate, weight })
        .then(workout => {
            res.json("Workout added successfully");
        })
        .catch(err => {
            console.error("Error adding workout:", err);
            res.status(500).json("Error adding workout");
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
        console.error("Error checking workout:", error);
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
        console.error("Error updating workout:", error);
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
