import React, { useState ,useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import './AddWorkout.css';
import axios from 'axios';

function AddWorkout() {
    const [date, setDate] = useState('');
    const [steps, setSteps] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [weight, setWeight] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [showWorkouts, setShowWorkouts] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            localStorage.clear(); // Clear local storage if user is not logged in
        }
    }, []);

    const handleAddWorkoutClick = () => {
        setShowForm(true);
        setShowWorkouts(false);
        setIsUpdating(false);
        setDate('');
        setSteps('');
        setHeartRate('');
        setWeight('');
    };

    const handleViewWorkoutClick = async () => {
        const userId = localStorage.getItem('userId');
        console.log(userId)
        if (!userId) {
            alert('User is not logged in');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/workouts', { userId });
            console.log("haii",response)
            setWorkouts(response.data);
            setShowForm(false);
            setShowWorkouts(true);
        } catch (error) {
            alert('Error fetching workouts');
        }
    };

    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User is not logged in');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/checkworkout', {
                userId,
                date: selectedDate
            });
            if (response.data.exists) {
                setSteps(response.data.workout.steps);
                setHeartRate(response.data.workout.heartRate);
                setWeight(response.data.workout.weight);
                setIsUpdating(true);
            } else {
                setSteps('');
                setHeartRate('');
                setWeight('');
                setIsUpdating(false);
            }
        } catch (error) {
            alert('Error checking workout');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User is not logged in');
            return;
        }

        try {
            if (isUpdating) {
                const response = await axios.put('http://localhost:3001/updateworkout', {
                    userId,
                    date,
                    steps,
                    heartRate,
                    weight
                });
                alert(response.data);
            } else {
                const response = await axios.post('http://localhost:3001/addworkout', {
                    userId,
                    date,
                    steps,
                    heartRate,
                    weight
                });
                alert(response.data);
            }

            // Reset the form fields
            setDate('');
            setSteps('');
            setHeartRate('');
            setWeight('');
            setShowForm(false);  // Close the form after successful submission
        } catch (error) {
            alert('Error processing workout');
        }
    };

    return (
        <div className='entirewkout'>
            <Navbar />
            <div className='detailsform'>
                {showForm && (
                    <form onSubmit={handleSubmit} className="add-workout-form">
                        <span className="fclose-btn" onClick={() => setShowForm(false)}>&times;</span>
                        <label>
                            Select Date
                            <input type="date" value={date} onChange={handleDateChange} required />
                        </label>
                        <br />
                        <label>
                            Steps covered
                            <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} required />
                        </label>
                        <label>
                            Heart rate
                            <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className='hrt' required />
                        </label>
                        <label>
                            Weight in (kg)
                            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                        </label>
                        <div className='addins'>
                            <button type="submit">{isUpdating ? 'Update' : 'Add'}</button>
                        </div>
                    </form>
                )}
                {showWorkouts && (
                    <div className='workouts-list'>
                        <div className='workouts-header'>
                            <h2>Workouts</h2>
                            <span className='close-btn' onClick={() => setShowWorkouts(false)}>&times;</span>
                        </div>
                        {workouts.length > 0 ? (
                            <ul className='mywkout'>
                                {workouts.map((workout, index) => (
                                    <div className='singlewkout'>
                                        <strong>Date:</strong>  {workout.date.substring(0, 10)}  <br />
                                        <strong>Step count:</strong> {workout.steps} <br />
                                        <strong>Heart rate:</strong> {workout.heartRate} <br />
                                        <strong>Weight:</strong> {workout.weight} kg
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <div className='nowrk'><p style={{ textAlign: 'center', padding:'23px',   fontSize: '20px'}}>No workouts found.</p></div>
                        )}
                    </div>
                )}
                {!showForm && !showWorkouts && (
                    <div className='workoutarea'>
                        <p className='wrk'>You can add your workouts and view them</p>
                        <div className='workbtn'>
                            <button className='addbtn' onClick={handleAddWorkoutClick}>Add Workout</button> 
                            <button className='viewbtn' onClick={handleViewWorkoutClick}>View Workout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddWorkout;
