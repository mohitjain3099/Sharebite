import { Constants } from './APIServiceConstants';

export const apiServiceGetFilterEvent = async (filter: string) => {
    const response = await fetch(`${Constants.API_URL}/getEventFilterData?searchText=`+filter);
    const data = await response.json();
    return data;
}