import axios from 'axios';

export const registerUser = (userData, navigate) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData);

        const newUserData = response.data;
        console.log(newUserData);


        if (newUserData && newUserData.username) {
            localStorage.setItem('username', newUserData.username);
        }

        navigate('/app');
    } catch (err) {
        console.error("Registration error:", err.response.data);
    }
};

export const loginUser = (loginData, navigate) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', loginData);

        const userData = response.data;

        if (userData && userData.username) {
            dispatch(setUser({
                id: userData.user_id,
                username: userData.username,
            }));

            navigate('/app');
        }
    } catch (err) {
        console.error("Login error:", err.response.data);
    }
};

export const setUser = (userData) => {
    return {
        type: 'SET_USER',
        payload: userData
    };
};

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    };
};