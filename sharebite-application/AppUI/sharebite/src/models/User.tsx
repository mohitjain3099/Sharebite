import { Location } from './Media'

interface UserBase {
    id: string,
    email: string,
    password: string
}
interface IndividualUser extends UserBase {
    firstName: string,
    lastName: string,
    gender: string,
    role: string,
    dob: Date,
    contact: string,
    type: string
};

interface PartnerUser extends UserBase {
    name: string,
    contact: string,
    address: Location,
    type: string,
    role: string
}

class User implements IndividualUser, PartnerUser {
    firstName: string = '';
    lastName: string = '';
    gender: string= '';
    role: string = '';
    dob: Date = new Date();
    contact: string = '';
    type: string = '';
    name: string = '';
    address: Location ={
        id: 0,
        streetName: '',
        area: '',
        city: '',
        pinCode: '',
        state: '',
        coordinates: ''
    };
    id: string = '';
    email: string = '';
    password: string = '********';
}

export { User };
export type { IndividualUser, PartnerUser };