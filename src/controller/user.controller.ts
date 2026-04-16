import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { UpdateUserDTO } from "../dto/user.dto";

export const getOneByEmail = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const email:string = req.params.email;
        const result = await userService.findUserByEmail(email);
        if (!result)
            return res.status(404).json({message: "User not found by email"});
        res.status(200).json(result);
        } catch (err) {
        next(err);
    }
}

export const create = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({status:true, data:user});
        } catch (err) {
        console.log(err);
        next(err);
    }
}

export const update = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const username:string = req.params.username;
        const data: UpdateUserDTO = req.body;
        const result = await userService.updateUser(username, data);
        if (!result)
            return res.status(404).json({message: "User not found by username"})
        res.status(200).json(result);
        } catch (err) {
        next(err);
    }
}