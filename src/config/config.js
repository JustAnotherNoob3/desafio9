import dotenv from 'dotenv';
dotenv.config();
export default {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
    isProd: process.env.BACKEND_TYPE == 'Productive',
    daoType: process.argv[2]
}