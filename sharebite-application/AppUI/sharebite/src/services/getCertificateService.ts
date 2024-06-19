// get certificate by user id
import { Constants } from './APIServiceConstants';

export const getCertificate = async (userId: String) => {
    const response = await fetch(`${Constants.API_URL}/certificates/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
    
}