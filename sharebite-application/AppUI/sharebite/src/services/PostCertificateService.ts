// post certificate service
import { Constants } from './APIServiceConstants';

export const NewCertificate = async (name: String, amount: number, userId: String ) => {
    const response = await fetch(`${Constants.API_URL}/certificates/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, amount, date: new Date(), userId})
    });
    const data = await response.json();
    console.log(data);
    return data;
    
}
