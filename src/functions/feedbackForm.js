import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const FEEDBACK_COLLECTION = "feedbacks";

export const feedbackFunction = async (form) => {
    try {
        const data = {
            ...form,
            createdAt: new Date().toISOString()
        }
        const docRef = await addDoc(collection(db, FEEDBACK_COLLECTION), data);

        if (docRef.id) {
            return { id: docRef.id, ...data };
        }

        return null;
    } catch (error) {
        console.error("Error adding feedback: ", error);
        return null;
    }
}

export const fetchFeedbacks = async () => {
    try {
        const q = query(collection(db, FEEDBACK_COLLECTION), orderBy("createdAt", "desc"));
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