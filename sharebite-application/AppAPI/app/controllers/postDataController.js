import { set } from 'mongoose';
import postData from '../models/postData.js';
import * as postDataService from '../services/postDataService.js';
import { setResponse, setErrorResponse } from './response-handler.js';
// Save post data
export const savePostData = async (req, res) => {
    try {
        const newPostData = await postDataService.savePostData(req.body);
        setResponse(newPostData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get post data
export const getPostData = async (req, res) => {
    try {
        const postData = await postDataService.getPostData();
        setResponse(postData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Get filtered post data
export const getFilteredPostData = async (req, res) => {
    try {
        const postData = await postDataService.getFilteredPostData(req.query);
        setResponse(postData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Patch post data
export const patchPostData = async (req, res) => {
    try {
        const updatedPostData = await postDataService.patchPostData(req.params.id, req.body);
        setResponse(updatedPostData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}
// Delete post data
export const deletePostData = async (req, res) => {
    try {
        const postData = await postDataService.deletePostData(req.params.id);
        setResponse(postData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}