
// require('dotenv').config();
// const bcrypt = require('bcryptjs');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const RecordModel = require('./model/Record');
// const WorkoutModel = require('./model/Workouts');

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());
// const PORT = process.env.PORT || 3000;
// const MONGO_URL = process.env.MONGO_URL;

// mongoose.connect(MONGO_URL);

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     RecordModel.findOne({ email })
//         .then(user => {
//             if (user) {
//                 console.log(user);
//                 return bcrypt.compare(password, user.password)
//                     .then(isMatch => {
//                         if (isMatch) {
//                             res.json({ status: "Success", userId: user._id, username: user.name });
//                         } else {
//                             res.json("Password is incorrect");
//                         }
//                     });
//             } else {
//                 res.json("No such record exist");
//             }
//         })
//         .catch(err => {
//             console.error("Error during login:", err);
//             res.status(500).json("Error during login");
//         });
// });

// app.post('/signup', async (req, res) => {
//     try {
//         console.log(req.body);
//         const { name, email, password } = req.body;
//         const existingUser = await RecordModel.findOne({ email });
//         if (existingUser) {
//             return res.json("Exists");
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await RecordModel.create({
//             name,
//             email,
//             password: hashedPassword
//         });
//         res.json({ status: "Success", userId: newUser._id, username: newUser.name });
//     } catch (err) {
//         console.error("Error during signup:", err);
//         res.status(500).json("Error creating user");
//     }
// });

// app.post('/addworkout', (req, res) => {
//     const { userId, date, steps, heartRate, weight } = req.body;
//     WorkoutModel.create({ userId, date, steps, heartRate, weight })
//         .then(workout => {
//             res.json("Workout added successfully");
//         })
//         .catch(err => {
//             console.error("Error adding workout:", err);
//             res.status(500).json("Error adding workout");
//         });
// });

// app.post('/checkworkout', async (req, res) => {
//     const { userId, date } = req.body;
//     try {
//         const workout = await WorkoutModel.findOne({ userId, date });
//         if (workout) {
//             res.status(200).json({ exists: true, workout });
//         } else {
//             res.status(200).json({ exists: false });
//         }
//     } catch (error) {
//         console.error("Error checking workout:", error);
//         res.status(500).json({ error: 'Error checking workout' });
//     }
// });

// app.put('/updateworkout', async (req, res) => {
//     const { userId, date, steps, heartRate, weight } = req.body;
//     try {
//         const workout = await WorkoutModel.findOneAndUpdate(
//             { userId, date },
//             { steps, heartRate, weight },
//             { new: true }
//         );
//         if (workout) {
//             res.status(200).json('Workout updated successfully');
//         } else {
//             res.status(404).json('Workout not found');
//         }
//     } catch (error) {
//         console.error("Error updating workout:", error);
//         res.status(500).json({ error: 'Error updating workout' });
//     }
// });

// app.post('/workouts', async (req, res) => {
//     const { userId } = req.body;

//     try {
//         const workouts = await WorkoutModel.find({ userId });
//         console.log(workouts);
//         res.json(workouts);
//     } catch (error) {
//         console.error('Error fetching workouts:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Add JWT
const RecordModel = require('./model/Record');
const WorkoutModel = require('./model/Workouts');

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'; // Use environment variable for JWT secret

mongoose.connect(MONGO_URL);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers
    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalid' });
        req.user = user; // Store user info in request
        next();
    });
};

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    RecordModel.findOne({ email })
        .then(user => {
            if (user) {
                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // Generate JWT token
                            const token = jwt.sign({ userId: user._id, username: user.name }, JWT_SECRET, { expiresIn: '1h' });
                            res.json({ status: "Success",token, userId: user._id, username: user.name });
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

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await RecordModel.findOne({ email });
        if (existingUser) {
            return res.json("Exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await RecordModel.create({ name, email, password: hashedPassword });
        
        // Generate JWT token for new user
        const token = jwt.sign({ userId: newUser._id, username: newUser.name }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: "Success",token, userId: newUser._id, username: newUser.name });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json("Error creating user");
    }
});

// Add workout route (Protected)
app.post('/addworkout', authenticateToken, (req, res) => {
    const { date, steps, heartRate, weight } = req.body;
    const userId = req.user.userId; // Get user ID from JWT

    WorkoutModel.create({ userId, date, steps, heartRate, weight })
        .then(workout => {
            res.json("Workout added successfully");
        })
        .catch(err => {
            console.error("Error adding workout:", err);
            res.status(500).json("Error adding workout");
        });
});

// Check workout route (Protected)
app.post('/checkworkout', authenticateToken, async (req, res) => {
    console.log("Request body:", req.body); // Log the request body
    console.log("Headers:", req.headers); // Log the headers

    const { userId, date } = req.body;
    try {
        const workout = await WorkoutModel.findOne({ userId, date });
        if (workout) {
            res.json({ exists: true, workout });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update workout route (Protected)
app.put('/updateworkout', authenticateToken, async (req, res) => {
    const { date, steps, heartRate, weight } = req.body;
    const userId = req.user.userId; // Get user ID from JWT

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

// Get all workouts route (Protected)
app.post('/workouts', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Get user ID from JWT

    try {
        const workouts = await WorkoutModel.find({ userId });
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
