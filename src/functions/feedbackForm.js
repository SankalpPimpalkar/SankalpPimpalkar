/* eslint-disable no-unused-vars */
import { Client, Databases, ID, Query } from "appwrite";

// For future purposes
export const config = {
    project_id: String(import.meta.env.VITE_APPWRITE_ID),
    endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    database_id: String(import.meta.env.VITE_APPWRITE_DB),
    feedback_collection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_FEEDBACK)
}

export const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.project_id)

export const database = new Databases(client)

export const feedbackFunction = async (form) => {
    try {

        const feedback = await database.createDocument(
            config.database_id,
            config.feedback_collection_id,
            ID.unique(),
            form
        )

        if (feedback) {
            return true;
        }

        return false;

    } catch (error) {
        console.error(error)
        return false;
    }
}

export const fetchFeedbacks = async () => {
    try {

        const feedbacks = await database.listDocuments(
            config.database_id,
            config.feedback_collection_id,
            [
                Query.orderAsc('$createdAt')
            ]
        )

        if (feedbacks) {
            return feedbacks.documents
        }

        return []

    } catch (error) {
        console.error(error)
        return []
    }
}