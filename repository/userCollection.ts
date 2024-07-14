import { fireStore } from "../config/firebaseConfig";

const updateUserData = async (userID: string, userData: any) => {
    try {
        const userExists = await fetchUserData(userID);
        if (!userExists) {
            throw new Error(`User with ID ${userID} not found`);
        }
        await fireStore.collection('USERS').doc(userID).set(userData, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('Error updating user: ', error);
        throw error;
    }
};

const fetchUserData = async (userID: string) => {
    try {
        const userDoc = await fireStore.collection('USERS').doc(userID).get();
        if (!userDoc.exists) {
            return null;
        }
        return userDoc.data();
    } catch (error) {
        console.error('Error in fetching data: ', error);
    }
}

export { updateUserData, fetchUserData };