import { setResponse, setErrorResponse } from './response-handler.js';
import * as subscriberService from '../services/subscriberService.js';


// Save subscriber
export const saveSubscriber = async (req, res) => {
    try {
        const newSubscriber = await subscriberService.saveSubscriber(req.body);
        res.status(200).json(newSubscriber);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}


// Get all emails
export const getAllEmails = async (req, res) => {
    try {
        const emails = await subscriberService.getAllEmails();
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}