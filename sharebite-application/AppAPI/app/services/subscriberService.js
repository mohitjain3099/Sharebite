import Subscriber from "../models/subscriberModel.js";


// Save subscriber
export const saveSubscriber = async (subscriberData) => {
    try {
        const subscriber = new Subscriber(subscriberData);
        return await subscriber.save();
    } catch (error) {
        throw error;
    }
}


// Get all emails
export const getAllEmails = async () => {
    try {
        const subscribers = await Subscriber.find({}, 'email'); // This will return only the email field of all subscribers
        return subscribers.map(subscriber => subscriber.email); // This will return an array of email strings
    } catch (error) {
        throw error;
    }
}