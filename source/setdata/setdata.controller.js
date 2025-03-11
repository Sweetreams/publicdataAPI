import { Router } from "express";
import { SetData } from "./setdata.service.js";
import { JWTvalidate } from "../unitls/JWTvalidate.js";
import { state } from "../unitls/stateHTTP.js";

const router = Router()
const setService = new SetData()

router.get('/getdata', JWTvalidate, async (req, res) => {
    try {
        const data = await setService.getSet()
        return res.status(200).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: data
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: state.ERROR,
            error: {
                code: 400,
                error_message: error,
                message: 'Произошла ошибка'
            }
        })
    }

})

router.get('/getdataset', JWTvalidate, async (req, res) => {
    try {
        const data = await setService.getDataSetID(req.query.id)
        return res.status(200).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: {
                    data: data[0].data.data,
                    title: data[0].data.title
                }
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: state.ERROR,
            error: {
                code: 400,
                error_message: error,
                message: 'Произошла ошибка'
            }
        })
    }

})

export const setRouter = router