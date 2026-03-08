import { db } from "./firebase";
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";
import { tagLine, skills, projects, works } from "../data/data";
import * as socials from "../data/links";

const SETTINGS_COLLECTION = "settings";
const SITE_SETTINGS_DOC = "site";

export const getSiteSettings = async () => {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, SITE_SETTINGS_DOC);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // Return defaults from hardcoded data
            return {
                tagLine,
                skills,
                projects,
                works,
                socials: {
                    Instagram: socials.Instagram,
                    Github: socials.Github,
                    LinkedIn: socials.LinkedIn,
                    X: socials.X,
                    College: socials.College
                },
                aboutBlocks: [] // Default empty, will fallback to hardcoded About.jsx if empty
            };
        }
    } catch (error) {
        console.error("Error getting site settings:", error);
        return null;
    }
};

export const updateSiteSettings = async (data) => {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, SITE_SETTINGS_DOC);
        await setDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating site settings:", error);
        throw error;
    }
};
