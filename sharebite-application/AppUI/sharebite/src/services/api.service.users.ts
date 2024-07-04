import { IndividualUser, PartnerUser } from '../models/User';
import { Constants } from './APIServiceConstants';
import {Link} from 'react-router-dom';

// api call to save user in the mongo db
export const saveUserData = async (userData: IndividualUser | PartnerUser): Promise<any> => {
    console.log('userDataServiceFile:', JSON.stringify(userData));
    const url = `${Constants.API_URL}${Constants.API_USER}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response;
}

// api call to authenticate user from the mongo db
export const authenticateUser = async (userData: { email: string, password: string }) => {
    const url = `${Constants.API_URL}${Constants.API_USER}${Constants.API_LOGIN}`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return resp;
}

// api call to update user data from the mongo db
export const updateUserData = async (userData: IndividualUser | PartnerUser): Promise<any> => {
    const url = `${Constants.API_URL}${Constants.API_USER}`;
    console.log('userDataServiceFile:', JSON.stringify(userData));
    
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response;
}

// api call to get user data by role from the mongo db
export const getUserCountByRole = async (role: string): Promise<any> => {
    const url = `${Constants.API_URL}${Constants.API_USER}${Constants.API_UserByRole}${role}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}