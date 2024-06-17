import {saveCertificateService} from '../services/certificateService.js'
import {getCertificateService} from '../services/certificateService.js'
import { getCertificateServiceById } from '../services/certificateService.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Save certificate controller
export const saveCertificateController = async (req, res) => {
    try {
        const newCertificate = await saveCertificateService(req.body);
        setResponse(newCertificate, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get certificate controller
export const getCertificateController = async (req, res) => {
    try {
        const certificate = await getCertificateService();
        setResponse(certificate, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get certificate controller by id
export const getCertificateControllerById = async (req, res) => {
    try{
        const certificate = await getCertificateServiceById(req.params.id);
        setResponse(certificate, res);
    } catch(error){
        setErrorResponse(error, res);
    }
}
export default saveCertificateController;