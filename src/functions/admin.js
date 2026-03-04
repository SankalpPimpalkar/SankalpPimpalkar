export const isAdmin = (email) => {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
    return adminEmails.includes(email);
};

export const getEnderChestUrl = () => {
    return import.meta.env.VITE_ENDERCHEST_BASE_URL || 'http://localhost:5000';
};
