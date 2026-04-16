import User, { IUser } from '../models/user.model';
import Role, { IRole } from '../models/role.model';
import { Types } from "mongoose";
import bcrypt from 'bcrypt';
import { CreateUserDTO } from '../dto/user.dto';
import * as userDAO from '../dao/user.dao';


export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

export const findUserByEmail = async(email:string) => {
    const user = await userDAO.findByEmail(email);
    if (user) {
        return user;
    }
}

export const createUser = async(payload:CreateUserDTO) => {
    if (payload.password) {
        const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
        payload.password = hash;
    }

    let roleIds : Types.ObjectId[] = [];
    if (payload.roles && payload.roles.length > 0) {
        roleIds = payload.roles.map(id => new Types.ObjectId(id));
    } else {
        let reader: IRole | null = await Role.findOne({ role: "READER" });
        if (!reader) {
            reader = await Role.create({ role: "READER", description: "Default Role", active: true });
        }
        roleIds = [reader._id];
    }

//     const user = new User({
//         // "username":payload.username,
//         // "password":payload.password,
//         // "email": payload.email,
//         ...payload,
//         roles: roleIds
//     });

//     console.log("New user: ", user);
//     return user.save();
    const user = await userDAO.createUser({
        ...payload,
        roles: roleIds
    });

    return user;
}