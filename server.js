import express from 'express'
import {userRouter} from './source/user/user.controller.js'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { setRouter } from './source/setdata/setdata.controller.js'

const prisma = new PrismaClient()
const app = express()


async function main(){
    app.use(express.json())
    app.use(cors({
      origin: [
        'https://publicdata-frontend-2hewbdrp0-pavels-projects-089fe0b1.vercel.app',
        'https://publicdata-frontend.vercel.app',
        'http://localhost:5173'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'cache-control'],
      credentials: true
    }))
    app.use('/user', userRouter)
    app.use('/set', setRouter)

    app.listen(8000, () => {
      console.log('8000')
    })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })