import { Constants } from './APIServiceConstants';

export const patchPostData = async (data:any, id:any) => {
    const response = await fetch(`${Constants.API_URL}/medias/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log('patch res:'+res);
    return res;
}
export default patchPostData;