function timeAgo(dateString) {
    const date = new Date(dateString); // Convert the input string to a Date object
    const now = new Date(); // Get the current time

    const seconds = Math.floor((now - date) / 1000); // Difference in seconds
    const minutes = Math.floor(seconds / 60); // Difference in minutes
    const hours = Math.floor(minutes / 60); // Difference in hours
    const days = Math.floor(hours / 24); // Difference in days
    const months = Math.floor(days / 30); // Difference in months (approx.)
    const years = Math.floor(months / 12); // Difference in years

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 30) {
        return `${days} days ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {
        return `${years} years ago`;
    }
}

function getYear(dateString) {
    const date = new Date(dateString); // Convert the input string to a Date object
    return date.getFullYear(); // Extract and return the year
}

export {
    timeAgo,
    getYear
}