import { setResponse, setErrorResponse } from './response-handler.js';
import * as eventDataService from '../services/eventDataService.js';
// Save event data
export const saveEventData = async (req, res) => {
    try {
        const newEventData = await eventDataService.saveEventData(req.body);
        setResponse(newEventData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get all event data
export const getAllEventData = async (req, res) => {
    try {
        const eventData = await eventDataService.getAllEventData();
        setResponse(eventData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get filtered event data
export const getEventFilterData = async (req, res) => {
    try {
        const eventData = await eventDataService.getEventFilterData(req.query);
        setResponse(eventData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Update event data
export const updateEventData = async (req, res) => {
    try {
        const updatedEventData = await eventDataService.updateEventData(req.params.id, req.body);
        setResponse(updatedEventData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}