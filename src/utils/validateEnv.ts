export const validateEnv = () => {
    if (!process.env.HORIZON_BOT_TOKEN ) {
        console.warn("Missing HORIZON_BOT_TOKEN.");
        return false;
    }
    //
    // if (!process.env.MONGO_URI) {
    //     console.warn("Missing MongoDB connection.");
    //     return false;
    // }
    return true;
};
