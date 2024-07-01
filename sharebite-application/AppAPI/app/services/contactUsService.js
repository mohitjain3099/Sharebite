import ContactUs from "../models/contactUs.js";
// Save contact us
export const saveContactUs = async (contactUsData) => {
    try {
        return await ContactUs.create(contactUsData);
    } catch (error) {
        throw error;
    }
}
// Get all contact us
export const getAllContactUs = async () => {
    try {
        return await ContactUs.find();
    } catch (error) {
        throw error;
    }
}