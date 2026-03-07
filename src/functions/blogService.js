import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    setDoc,
    increment
} from "firebase/firestore";
import { getEnderChestUrl } from "./admin";

const BLOGS_COLLECTION = "blogs";
const CATEGORIES_COLLECTION = "categories";

export const uploadImageToEnderChest = async (file) => {
    const url = `${getEnderChestUrl()}/api/v1/assets`;
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image to EnderChest");
        }

        return await response.json();
    } catch (error) {
        console.error("EnderChest Upload Error:", error);
        throw error;
    }
};

export const deleteImageFromEnderChest = async (fileId) => {
    const url = `${getEnderChestUrl()}/api/v1/assets/${fileId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.warn(`Failed to delete image ${fileId} from EnderChest`);
        }
    } catch (error) {
        console.error("EnderChest Delete Error:", error);
    }
};

export const getCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
        return querySnapshot.docs.map(doc => doc.id);
    } catch (error) {
        console.error("Error getting categories:", error);
        return [];
    }
};

export const ensureCategoryExists = async (category) => {
    if (!category) return;
    try {
        const categoryId = category.trim();
        const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, {
                name: categoryId,
                createdAt: serverTimestamp()
            });
        }
    } catch (error) {
        console.error("Error ensuring category exists:", error);
    }
};

export const createBlog = async (blogData) => {
    try {
        // Ensure category is created in categories collection
        if (blogData.category) {
            await ensureCategoryExists(blogData.category);
        }

        const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
            ...blogData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};

export const getBlogBySlug = async (slug) => {
    try {
        const q = query(collection(db, BLOGS_COLLECTION), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate(),
                updatedAt: docSnap.data().updatedAt?.toDate(),
            };
        }
        return null;
    } catch (error) {
        console.error("Error getting blog by slug:", error);
        throw error;
    }
};

export const getAllBlogs = async () => {
    try {
        const q = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
        }));
    } catch (error) {
        console.error("Error getting blogs:", error);
        throw error;
    }
};

export const getBlogById = async (id) => {
    try {
        const docRef = doc(db, BLOGS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate(),
                updatedAt: docSnap.data().updatedAt?.toDate(),
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting blog by id:", error);
        throw error;
    }
};

export const deleteBlog = async (id, imageIds = []) => {
    try {
        // Delete images from EnderChest first
        for (const fileId of imageIds) {
            await deleteImageFromEnderChest(fileId);
        }

        // Delete blog from Firestore
        await deleteDoc(doc(db, BLOGS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error;
    }
};

export const toggleLike = async (blogId, isLiking) => {
    try {
        const docRef = doc(db, BLOGS_COLLECTION, blogId);
        await updateDoc(docRef, {
            likes: increment(isLiking ? 1 : -1)
        });
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};
