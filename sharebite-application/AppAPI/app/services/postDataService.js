import postData from "../models/postData.js";
// Save post data
export const savePostData= async(postDataObj) => {
    try {
        const newPostData = new postData(postDataObj);
        await newPostData.save();
        return newPostData;
    } catch (error) {
        console.log(error);
    }
}
// Get post data
export const getPostData = async(searchText={}) => {
    const postDataList = await postData.find(searchText).exec();
    return postDataList;
}
// Get filtered post data
export const getFilteredPostData = async(filter) => {
    let query = {
        $or: [
            {title: { $regex: filter.searchText, $options: 'i' }},
            {caption: { $regex: filter.searchText, $options: 'i' }},
            {author: { $regex: filter.searchText, $options: 'i' }},
            {postType: { $regex: filter.searchText, $options: 'i' }},
            {userId: { $regex: filter.searchText, $options: 'i' }},
            {deliveryId: { $regex: filter.searchText, $options: 'i' }}
        ]
    };
    const postDataList = await postData.find(query).exec();
    return postDataList;
}
// Patch post data
export const patchPostData = async(id, postDataObj) => {
    const updatedPostData = await postData.findOneAndUpdate({id: id}, postDataObj, {new: true}).exec();
    return updatedPostData;
}
// Delete post data
export const deletePostData = async(id) => {
    const postDataList = await postData.findOneAndDelete({id: id}).exec();
    return postDataList;
}
