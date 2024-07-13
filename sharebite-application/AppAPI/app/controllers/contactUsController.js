import { setResponse, setErrorResponse } from './response-handler.js';
import * as contactUsService from '../services/contactUsService.js';

// Save contact us
export const saveContactUs = async (req, res) => {
    try {
        const newContactUs = await contactUsService.saveContactUs(req.body);
        setResponse(newContactUs, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// Get all contact us
export const getAllContactUs = async (req, res) => {
    try {
        const contactUs = await contactUsService.getAllContactUs();
        setResponse(contactUs, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}