import * as graphicalDataService from '../services/graphicalDataService.js';

// Get all graphical data
export const getGraphicalData = async (req, res) => {
    try {
        const data = await graphicalDataService.getGraphicalData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

// post graphical data
export const postGraphicalData = async (req, res) => {
    try {
        const data = await graphicalDataService.postGraphicalData(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

// patch graphical data
export const patchGraphicalData = async (req, res) => {
    try {
        const data = await graphicalDataService.patchGraphicalData(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}