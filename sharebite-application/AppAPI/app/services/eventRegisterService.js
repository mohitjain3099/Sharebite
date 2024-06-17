import eventRegister from "../models/eventRegister.js";
//write export for saving the new data
export const saveEventRegister = async (eventRegisterData) => {
    try {
        return await eventRegister.create(eventRegisterData);
    } catch (error) {
        throw error;
    }
}
//write export for getting all the data
export const getAllEventRegister = async () => {
    try {
        return await eventRegister.find();
    } catch (error) {
        throw error;
    }
}