import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { state } from './stateHTTP.js'

dotenv.config()

export const JWTvalidate = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.SECRETKEYJWT, (err, decoded) => {
        
        if (!decoded) {
            return res.status(401).json({
                status: state.ERROR,
                error: {
                    code: 401,
                    message: 'Ошибка авторизации'
                }
            })
        } else {
            next()
        }
    })
}