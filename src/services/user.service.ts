import User, { IUser } from '../models/user.model';
import { IRole } from '../models/role.model';

import { Types } from "mongoose";

export const createUser = async(payload: IUser) => {
    console.log(payload);
    return payload
}