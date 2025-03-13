import { Router } from 'express'
import { User } from './user.service.js'
import bcrypt from 'bcryptjs'
import { state } from '../unitls/stateHTTP.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { loginValidate } from '../unitls/validateData.js'
import { JWTvalidate } from '../unitls/JWTvalidate.js'

const router = Router()
const userService = new User()
dotenv.config()

router.post('/loginuser', async (req, res) => {
    try {
        const user = await userService.getUser(req.body?.login)

        if (user.length == 0) {
            return res.status(400).json({
                message: "Нет аккаунта",
                count: user.length
            })
        }

        const isMatch = await bcrypt.compare(req.body?.password, user[0].bcryptpassword)


        if (!isMatch) {
            return res.status(400).json({
                status: state.ERROR,
                error: {
                    code: 400,
                    message: 'Пользователя не существует'
                }
            })
        }

        let token = jwt.sign({
            id: user[0].id,
            name: user[0].name,
            role: user[0].role
        }, process.env.SECRETKEYJWT)

        return res.status(200).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                token: token,
                role: user[0].role
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/createuser', async (req, res) => {
    try {
        if (await loginValidate.isValid(req.body) == false) {
            return res.status(400).json({
                status: state.ERROR,
                error: {
                    code: 400,
                    message: 'Ошибка валидации'
                }
            })
        }


        bcrypt.genSalt(10, async (err, Salt) => {
            bcrypt.hash(req.body?.password, Salt, async (err, hash) => {
                const user = await userService.createUser({
                    name: req.body?.login,
                    login: req.body?.login,
                    bcryptpassword: hash,
                    email: req.body?.email
                })
                var token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.SECRETKEYJWT)
                return res.status(200).json({
                    status: state.SUCCESS,
                    data: {
                        code: 200,
                        token: token,
                        role: user.role,
                        message: 'Успешно'
                    }
                })
            })
        })

    } catch (error) {
        console.log(error)
    }
})

router.get('/profile', JWTvalidate, async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRETKEYJWT, function (err, decoded) {
            return res.status(200).json({
                status: state.SUCCESS,
                data: {
                    code: 200,
                    message: decoded.name
                }
            })
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: state.ERROR,
            data: {
                code: 400,
                message: error
            }
        })
    }
})

router.put('/editinguser', JWTvalidate, async (req, res) => {
    try {
        await userService.editingUser(req.body.id, req.body.data)
        return res.status(200).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: "Успешно"
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: state.SUCCESS,
            data: {
                code: 400,
                error: error,
                message: "Произошла ошибка"
            }
        })
    }

})

export const userRouter = router