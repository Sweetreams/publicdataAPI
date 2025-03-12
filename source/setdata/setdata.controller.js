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
    const data = await setService.getDataSet()
    return res.status(200).json({
        data: data
    })
    // try {
        // const data = await setService.getDataSetID(req.query.id)
        
        // return res.status(200).json({
        //     status: state.SUCCESS,
        //     data: {
        //         code: 200,
        //         message: {
        //             data: data[0].data.data,
        //             title: data[0].data.title
        //         }
        //     }
        // })
    // } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({
    //         status: state.ERROR,
    //         error: {
    //             code: 400,
    //             error_message: error,
    //             message: 'Произошла ошибка'
    //         }
    //     })
    // }
})

//TODO: Добавить проверку на admin

router.post('/createset', JWTvalidate, async(req, res) => {
    console.log(typeof req.body)
    await setService.createSet(req.body)
})

router.post('/createsetdata', JWTvalidate, async(req, res) => {
    const data = await setService.createDataSet(req.body)
    console.log(data)
})

router.delete('/deletedataset', JWTvalidate, async(req, res) => {
    await setService.deleteDataSetID(req.body?.id)
})

export const setRouter = router