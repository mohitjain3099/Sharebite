import certificateModel from "../models/certificate.js";
// Save certificate service
export const saveCertificateService = async(certificateObj) => {
    try {
        const newCertificate = new certificateModel(certificateObj);
        await newCertificate.save();
        return newCertificate;
    } catch (error) {
        console.log(error);
    }
}
// Get certificate service
export const getCertificateService = async() => {
    try {
        return await certificateModel.find();
    } catch (error) {
        console.log(error);
    }
}
// Get certificate service by id
export const getCertificateServiceById = async(userId) =>{
    try{
        return await certificateModel.find({userId: userId});
    }
    catch(error){
        console.log(error);
    }
}