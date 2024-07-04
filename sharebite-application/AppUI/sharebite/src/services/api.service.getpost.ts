import { Constants } from './APIServiceConstants';

export const getpost = async () => {
    const response = await fetch(`${Constants.API_URL}/medias`);
    const data = await response.json();
    return data;
};

export default getpost;