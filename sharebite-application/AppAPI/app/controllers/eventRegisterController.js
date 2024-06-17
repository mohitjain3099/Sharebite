import { setResponse, setErrorResponse } from './response-handler.js';
import * as eventRegisterService from '../services/eventRegisterService.js';
// Save event register
export const saveEventRegister = async (req, res) => {
    try {
        const newEventRegister = await eventRegisterService.saveEventRegister(req.body);
        setResponse(newEventRegister, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get all event register
export const getAllEventRegister = async (req, res) => {
    try {
        const eventRegister = await eventRegisterService.getAllEventRegister();
        setResponse(eventRegister, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
