const API_BASE_URL = process.env.NODE_ENV === "development"
    ? process.env.DEVELOPMENT_API_URL
    : process.env.PRODUCTION_API_URL;

export default API_BASE_URL;
