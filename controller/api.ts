import { Request, Response } from "express";
import { fireStore } from "../config/firebaseConfig";
import ApiError from "../entities/ApiError";
import { updateUserData, fetchUserData } from "../repository/userCollection";
const updateUser = async (req: Request, res: Response) => {
    const { name, age, city, email } = req.body;
    const userID = req.params.userID;
    try {
        const userDoc = await fetchUserData(userID);
        if (!userDoc) {
            return res.status(404).json(ApiError.notFound('User not found'));
        }
        await updateUserData(userID, { name, age, city, email });
        res.status(200).json({ message: 'User data updated.' });
    } catch (error) {
        res.status(500).json(ApiError.internal('Failed to update data.'));
    }
};

const fetchUser = async (req: Request, res: Response) => {
    const userID = req.params.userID;
    try {
        const userDoc = await fetchUserData(userID);
        if (!userDoc) {
            return res.status(404).json(ApiError.notFound('User not found'));
        }
        res.status(200).json(userDoc);
    } catch (error) {
        res.status(500).json(ApiError.internal('Failed to retrieve data.'));
    }
};

export { updateUser, fetchUser };
