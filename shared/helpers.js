export const getUserId = (message) => {
    if (message.reply_to_message) {
        return message.reply_to_message.from.id;
    }
    return message.from.id;
};