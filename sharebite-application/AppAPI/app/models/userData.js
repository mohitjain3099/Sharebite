import mongoose from 'mongoose';
import { locationSchema } from './postData.js';
import schemaConfig from './schema-config.js';

const individualUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'individual'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
}, schemaConfig);

const partnerUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'partner'
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: locationSchema,
        required: true
    }
}, schemaConfig);

export const individualUserData = mongoose.model('individualUserData', individualUserSchema);
export const partneredUserData = mongoose.model('partnerUserData', partnerUserSchema);
