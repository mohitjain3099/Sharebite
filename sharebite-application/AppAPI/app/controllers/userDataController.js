import { set } from "mongoose";
import * as userDataServices from "../services/userDataServices.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

// create new user in the database
export const createNewUser = async (req, res) => {
    try {
        console.log("In createNewUser userDataController");
        const newUserData = await userDataServices.saveUserData({ ...req.body });
        setResponse(newUserData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// update user data in the database
export const updateUser = async (req, res) => {
    try {
        console.log("In updateUser userDataController");
        const updatedUserData = await userDataServices.updateUserData({ ...req.body });
        if (!updatedUserData) {
            let error = new Error("User not found");
            setErrorResponse(error, res, 404);
        }
        else
            setResponse(updatedUserData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// get all users from the database
export const getAllUsers = async (req, res) => {
    try {
        console.log("In getAllUsers userDataController");
        const userDataList = await userDataServices.getUserData();
        setResponse(userDataList, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// authenticate user
export const authenticateUser = async (req, res) => {
    try {
        console.log("In authenticateUser userDataController");
        const userData = await userDataServices.authenticateUser(req.body);
        if (!userData) {
            let error = new Error("Invalid credentials");
            setErrorResponse(error, res, 401);
        }
        else
            setResponse(userData, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// check if email id exists
export const doesEmailIdExists = async (req, res) => {
    try {
        console.log("In doesEmailIdExists userDataController");
        const userExists = await userDataServices.doesEmailIdExists(req.params.emailId);
        setResponse(userExists, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// get total number of users
export const getNumberOfUsers = async (req, res) => {
    try {
        console.log("In getNumberOfUsers userDataController");
        const userCount = await userDataServices.getNumberOfUsers();
        setResponse(userCount, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// get total number of users by role
export const getUserCountByRole = async (req, res) => {
    try {
        console.log("In getUserCountByRole userDataController");
        const userCount = await userDataServices.getUserCountByRole(req.params.role);
        setResponse(userCount, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// get user by id
export const getUserById = async (req, res) => {
    try {
        console.log("In getUserById userDataController");
        const user = await userDataServices.getUserById(req.params.userId);
        if (!user) {
            let error = new Error("User not found");
            setErrorResponse(error, res, 404);
        }
        else
            setResponse(user, res);
        setResponse(user, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}