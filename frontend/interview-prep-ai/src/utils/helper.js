export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (title, maxLength = 2) => {
    if (!title) return "";

    const words = title.trim().split(" ").filter(Boolean); // Remove extra spaces
    let initials = "";

    for (let i = 0; i < Math.min(words.length, maxLength); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};
