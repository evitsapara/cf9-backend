import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const create = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({status:true, data:user});
        } catch (err) {
        console.log(err);
        next(err);
    }
}