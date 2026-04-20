import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES = '1h';

export const login = async(username:string, password: string) => {
    const user = await User.findOne({username:username}).populate('roles');
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const payload = { username: user.username, email: user.email, roles: user.roles }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    return {user, token};
}