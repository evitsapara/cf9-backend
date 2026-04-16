import User, { IUser } from "../models/user.model";

export const findByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email: email }).populate('roles');
}

export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
    const user = new User(data);
    return await user.save();
}