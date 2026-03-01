import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const FEEDBACK_COLLECTION = "feedbacks";

export const feedbackFunction = async (form) => {
    try {
        const docRef = await addDoc(collection(db, FEEDBACK_COLLECTION), {
            ...form,
            createdAt: new Date().toISOString()
        });

        if (docRef.id) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error adding feedback: ", error);
        return false;
    }
}

export const fetchFeedbacks = async () => {
    try {
        const q = query(collection(db, FEEDBACK_COLLECTION), orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);

        const feedbacks = [];
        querySnapshot.forEach((doc) => {
            feedbacks.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return feedbacks;
    } catch (error) {
        console.error("Error fetching feedbacks: ", error);
        return [];
    }
}