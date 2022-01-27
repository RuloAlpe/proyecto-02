import dotenv from 'dotenv';

dotenv.config();

const config = {};

config.port = process.env.PORT || 5055;
config.username = process.env.username;

export default config;
