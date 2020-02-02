import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleAxisChart from './canvasjs/MultipleAxisChart';
import axios from 'axios';
import moment from 'moment';

export const UserData = (props) => {
    const [loading, setLoading] = useState(true);
    const [sexs, setSexs] = useState([]);
    const [activities, setActivities] = useState([]);//zapisywanie dynamiczne danych w formularzu
    const [userDataId, setUserDataId] = useState('');
    const [userName, setUserName] = useState('');
    const [userHeight, setUserHeight] = useState(0);
    const [userWeight, setUserWeight] = useState(0);
    const [userDateOfBirth, setUserDateOfBirth] = useState('');
    const [userSexId, setUserSexId] = useState(0);
    const [userActivityId, setUserActivityId] = useState(0);
    const [userStats, setUserStats] = useState([]);

    let activitiesPalValues = {};
    let userAge = 0;
    let userGoal = 0;
    let weightData = [];
    let goalData = [];

    const getApplicationUserId = async () => {
        const userProfile = await authService.getUser(); //pobieranie userID

        return userProfile.sub;
    }

    const getUserStats = async () => {
        try {
            const applicationUserId = await getApplicationUserId();
            const response = await axios.get(`api/UserStats/${applicationUserId}`);// odwo³anie do api-controller
            setUserStats(response.data); //zapisanie danych w stanie komponentu
        } catch (error) {
            console.warn('No user stats:', error);
        }
    }
    useEffect(() => {
        const getActivities = async () => {
            const response = await axios.get('api/Activities');
            setActivities(response.data); 
        }
        const getSexs = async () => {
            const response = await axios.get('api/Sexs');
            setSexs(response.data);
        }
        const getUsersDatas = async () => {
            try {
                const applicationUserId = await getApplicationUserId();
                const response = await axios.get(`api/UsersDatas/${applicationUserId}`);

                setUserDataId(response.data.userDataId);
                setUserName(response.data.name);
                setUserHeight(response.data.height);
                setUserWeight(response.data.weight);
                setUserDateOfBirth(moment(response.data.dateOfBirth).format('YYYY-MM-DD'));
                setUserSexId(response.data.sexId);
                setUserActivityId(response.data.activityId);
            } catch (error) {
                console.warn('No user data:', error);
            } finally {
                setLoading(false);
            }
        }

        getActivities();
        getSexs();
        getUsersDatas();
        getUserStats();
    }, []);

    const handleNameChange = (event) => { //obs³uga zmian w formularzu-wyliczenia automatyczne(goal)
        setUserName(event.target.value);
    }
    const handleHeightChange = (event) => {
        setUserHeight(parseInt(event.target.value, 10));
    }
    const handleWeightChange = (event) => {
        setUserWeight(parseInt(event.target.value, 10));
    }
    const handleDateOfBirthChange = (event) => {
        setUserDateOfBirth(moment(event.target.value).format('YYYY-MM-DD'));
    }
    const handleSexChange = (event) => {
        setUserSexId(parseInt(event.target.value, 10));
    }
    const handleActivityChange = (event) => {
        setUserActivityId(parseInt(event.target.value, 10));
    }

    const addNewUserData = async (data) => {
        try {
            await axios.post('api/UsersDatas', data);
        } catch (error) {
            console.log('User data not added', error);
        }
    }
    const updateUserData = async (data) => {
        const dataToUpdate = {
            'userDataId': userDataId,
            ...data
        }
        try {
            await axios.put(`api/UsersDatas/${userDataId}`, dataToUpdate);
        } catch (error) {
            console.log('User data not updated', error);
        }
    }
    const addNewStats = async (stats) => {
        try {
            await axios.post('api/UserStats', stats);
            getUserStats();
            console.log('userStats', userStats);
        } catch (error) {
            console.log('User stats not added', error);
        }
    }
    const handleSubmit = async (event) => { 
        event.preventDefault();

        const applicationUserId = await getApplicationUserId();
        const data = { //zebranie danych do bazy
            'name': userName,
            'height': userHeight,
            'weight': userWeight,
            'dateOfBirth': userDateOfBirth,
            'sexId': userSexId,
            'activityId': userActivityId,
            'goal': userGoal,
            'applicationUserId': applicationUserId
        };

        if (userDataId) {
            updateUserData(data);
        } else {
            addNewUserData(data);
        }
        const stats = {
            'registerDate': moment().format('YYYY-MM-DDTHH:mm:ss'),
            'weight': userWeight,
            'goal': userGoal,
            'applicationUserId': applicationUserId
        };
        addNewStats(stats);
    }

    userAge = moment().diff(userDateOfBirth, 'years');

    const getPPMValue = () => {
        if (userSexId === 2) { // male
            return 66.47 + 13.7 * (userWeight || 0) + 5 * (userHeight || 0) - 6.76 * userAge;
        }

        // female
        return 665.09 + 9.56 * (userWeight || 0) + 1.85 * (userHeight || 0) - 4.67 * userAge;
    }

    activities.forEach(activity => activitiesPalValues[activity.activityId] = activity.pal);

    const PPM = getPPMValue();
    const PAL = activitiesPalValues[userActivityId];
    userGoal = Math.round(PPM * PAL);

    weightData = userStats ? userStats.map(userStat => {
        return {
            x: new Date(userStat.registerDate),
            y: userStat.weight
        }
    }) : [];
    goalData = userStats ? userStats.map(userStat => {
        return {
            x: new Date(userStat.registerDate),
            y: userStat.goal
        }
    }) : [];

    const renderUserDataForm = () => {
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="userName">Name</Label>
                        <Input type="text" name="name" id="userName" placeholder="provide your name" value={userName} onChange={handleNameChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userHeight">Height</Label>
                        <Input type="number" name="height" id="userHeight" placeholder="provide your height in cm" value={userHeight} onChange={handleHeightChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userWeight">Weight</Label>
                        <Input type="number" name="weight" id="userWeight" placeholder="provide your weight in kg" value={userWeight} onChange={handleWeightChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userBirthDate">Birth date</Label>
                        <Input type="date" name="birthDate" id="userBirthDate" placeholder="provide your date of birth" value={userDateOfBirth} onChange={handleDateOfBirthChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userSexId">Sex</Label>
                        <Input type="select" name="sex" id="userSexId" value={userSexId} onChange={handleSexChange} required>
                            <option value="">choose your sex</option>
                            {sexs.map(sex => (<option key={sex.sexId} value={sex.sexId}>{sex.description}</option>))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userActivityId">Activity</Label>
                        <Input type="select" name="activity" id="userActivityId" value={userActivityId} onChange={handleActivityChange} required>
                            <option value="">choose your activity type</option>
                            {activities.map(activity => (<option key={activity.activityId} value={activity.activityId}>{activity.description}</option>))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userGoal">Goal</Label>
                        <Input type="text" name="goal" id="userGoal" placeholder="0" value={`${userGoal} kcal / day`} disabled />
                    </FormGroup>
                    <Button type="submit">Update</Button>
                </Form>
                <hr />
                <MultipleAxisChart weightData={weightData} goalData={goalData}/>
            </div>
        )
    }

    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderUserDataForm();

    return (
        <div>
            {contents}
        </div>
    );
}