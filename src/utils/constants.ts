import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config({path: "variables.env"});

export const SECRET_KEY: Secret = String(process.env.JWT_SECRET);
export const PORT: number = Number(process.env.PORT);
export const HOST: string = String(process.env.HOST);
export const DB: string = String(process.env.DB);
export const DB_PASSWORD: string = String(process.env.DB_PASSWORD);
export const DB_USER: string = String(process.env.DB_USER);
export const PORT_BACKEND: string = String(process.env.PORT_BACKEND);