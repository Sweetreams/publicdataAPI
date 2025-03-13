import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { state } from './stateHTTP.js'

dotenv.config()
export const JWTAdminfind = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.SECRETKEYJWT, async (err, decode) => {
        if (decode.role != "admin") {
            return res.status(401).json({
                status: state.ERROR,
                data: {
                    code: 401,
                    error_message: err,
                    message: 'Пользователь не авторизован'
                }
            })
        }
        next()
    })
    
}