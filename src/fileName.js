export const createFilename = (channel, title, seconds) => {
    return `${channel} - ${title} (${new Date(seconds * 1000).toISOString().substr(11, 8)}).png`;
}