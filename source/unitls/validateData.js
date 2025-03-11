import { object, string } from "yup";

export const loginValidate = object({
    email: string().email().required(),
    login: string().required(),
    password: string().required()
})