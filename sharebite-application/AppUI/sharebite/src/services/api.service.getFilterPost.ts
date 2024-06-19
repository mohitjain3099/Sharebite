import { Constants } from './APIServiceConstants';

export const apiServiceGetFilterPost = async (filter: string) => {
    const response = await fetch(`${Constants.API_URL}/medias/filters?searchText=`+filter);
    const data = await response.json();
    return data;
}