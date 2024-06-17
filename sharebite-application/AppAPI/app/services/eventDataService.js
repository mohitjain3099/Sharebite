import eventData from "../models/eventData.js";
//write export for saving the new data
export const saveEventData = async (eventDataObj) => {
    try {
        const newEventData = new eventData(eventDataObj);
        await newEventData.save();
        return newEventData;
    } catch (error) {
        console.log(error);
    }
}
//write export for getting all the data
export const getAllEventData = async (searchText = {}) => {
    const eventDataList = await eventData.find(searchText).exec();
    return eventDataList;
}
//write export for getting the filtered data
export const getEventFilterData = async (filter) => {
    let query = {
        $or: [
            { title: { $regex: filter.searchText, $options: 'i' } },
            { caption: { $regex: filter.searchText, $options: 'i' } },
            { author: { $regex: filter.searchText, $options: 'i' } }
        ]
    };
    const eventDataList = await eventData.find(query).exec();
    return eventDataList;
}


//write export for updating the existing data with patch
export const updateEventData = async (id, eventDataObj) => {
    try {
        const updatedEventData = await eventData.findByIdAndUpdate(id, eventDataObj, { new: true });
        return updatedEventData;
    }
    catch (error) {
        console.log(error);
    }
}
