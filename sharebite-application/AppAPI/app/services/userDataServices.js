import e from "express";
import { individualUserData, partneredUserData } from "../models/userData.js";
import serviceConstants from "./serviceConstants.js";

// This function is used to save the user data in the database
export const saveUserData = async (userDataObj) => {
    let newUserData = {};
    try {
        if (userDataObj.type === serviceConstants.IndividualUserType) {
            newUserData = new individualUserData(userDataObj);
        }
        else if (userDataObj.type === serviceConstants.PartnerUserType) {
            console.log("Partner User Data: ", userDataObj);
            newUserData = new partneredUserData({
                ...userDataObj,
                address: userDataObj.address,
            });
        }
        else
            throw new Error("Invalid User Type");

        const response = await newUserData.save();
        return response;
    } catch (error) {
        console.log(`New User Data: ${newUserData}`, error);
        throw new Error(`New User Data: ${newUserData}`, error);
    }
}

// This function is used to update the user data in the database
export const updateUserData = async (userDataObj) => {
    let updatedUserData = {};
    try {
        if (userDataObj.type === serviceConstants.IndividualUserType) {
            updatedUserData = await individualUserData.findByIdAndUpdate(userDataObj.id, { ...userDataObj }, { new: true });

        }
        else if (userDataObj.type === serviceConstants.PartnerUserType) {
            updatedUserData = await partneredUserData.findByIdAndUpdate
                (userDataObj.id, { ...userDataObj }, { new: true });
        }
        else
            throw new Error("Invalid User Type");
    } catch (error) {
        console.log(`Error while updating userData: ${updatedUserData}`, error);
        throw new Error(`Updated User Data: ${updatedUserData}`, error);
    }
    return updatedUserData;
}

// This function is used to check if the email id exists in the database
export const doesEmailIdExists = async (email) => {
    let query = { email: email };
    console.log("In doesEmailIdExists userDataServices", query);
    const userDataList = await getUserData(query);
    return userDataList.length > 0;
}

// This function is used to get the user data from the database
export const getUserData = async (searchText = {}) => {
    let userDataList = [];
    try {
        userDataList = await individualUserData.find(searchText).exec();
        userDataList.push(...await partneredUserData.find(searchText).exec());

    } catch (error) {
        console.log(`User data list: ${userDataList}`, error);
    }
    return userDataList;
}

// This function is used to authenticate the user
export const authenticateUser = async (userDataObj) => {
    let query = {
        $and: [
            { email: userDataObj.email },
            { password: userDataObj.password }
        ]
    };
    const userDataList = await getUserData(query);
    if (userDataList.length === 0)
        return null;
    return userDataList.at(0);
}

// This function is used to get the number of users in the database
export const getNumberOfUsers = async () => {
    const userDataList = await getUserData();
    return {
        totalUsers: userDataList.length,
        individualUsers: userDataList.filter(user => user.type === serviceConstants.IndividualUserType).length,
        partnerUsers: userDataList.filter(user => user.type === serviceConstants.PartnerUserType).length
    };
}

// This function is used to get the user count by role
export const getUserCountByRole = async (role) => {
    const query = role ? { role: role } : {};
    console.log("In getUserCountByRole userDataServices", query);
    const userDataList = await getUserData(query);
    return userDataList.reduce((acc, user) => {
        acc[user.role] = acc[user.role] ? acc[user.role] + 1 : 1;
        return acc;
    }, {});
}

// This function is used to get the user by id
export const getUserById = async (userId) => {
    let user = await individualUserData.findById(userId).exec();
    if (!user)
        user = await partneredUserData.findById(userId).exec();

    return null;
}