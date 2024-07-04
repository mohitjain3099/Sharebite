import mongoose from 'mongoose';
// locationSchema is a subdocument schema used in the Schema below
const locationSchema = new mongoose.Schema({
    id: String,
    streetName: String,
    area: String,
    city: String,
    pinCode: String,
    state: String,
    coordinates: {
        lat: String,
        lng: String
    }
});
// Schema defines how the user data will be stored in MongoDB
const Schema = new mongoose.Schema({
    id: String,
    image: String,
    createdAt: Date,
    updatedAt: Date,
    author: String,
    location: locationSchema,
    caption: String,
    title: String,
    postType: String,
    mediaDetails: {
        shelfLife: String,
        isVeg: Boolean,
        allergens: [String],
        quantity: Number,
        unit: String,
        mealsDelivered: String
    },
    isDeliveryDone: Number,
    isPickedUp: Number,
    userId: String,
    deliveryId: String
});
// Sets the createdAt parameter equal to the current time
export default mongoose.model('postData', Schema);
export {locationSchema}