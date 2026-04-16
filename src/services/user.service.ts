import User, { IUser } from '../models/user.model';
import Role, { IRole } from '../models/role.model';
import { Types } from "mongoose";
import bcrypt from 'bcrypt';

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

export const createUser = async(payload:IUser) => {
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

    const user = new User({
        "username":payload.username,
        "password":payload.password,
        "email": payload.email,
        "roles": roleIds
    });
    console.log("New user: ", user);
    return user.save();
}