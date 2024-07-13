import GraphicalData from "../models/graphicalDataModel.js";


// Get all graphical data
export const getGraphicalData = async () => {
    try {
        const graphData = await GraphicalData.find();
        return graphData;
    }
    catch (error) {
        throw error;
    }
}

// post graphical data
export const postGraphicalData = async (data) => {
    try {
        const graphData = new GraphicalData(data);
        await graphData.save();
        return graphData;
    }
    catch (error) {
        throw error;
    }
}

// patch graphical data
export const patchGraphicalData = async (id, data) => {
    try {
        await GraphicalData.findByIdAndUpdate(id, data);
        return data;
    }
    catch (error) {
        throw error;
    }
}