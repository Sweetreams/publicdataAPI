import { Router } from "express";
import { SetData } from "./setdata.service.js";
import { JWTvalidate } from "../unitls/JWTvalidate.js";
import { state } from "../unitls/stateHTTP.js";
import { JWTAdminfind } from "../unitls/JWTAdminfind.js";

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
        if(data.length < 1){
            return res.status(400).json({
                status: state.ERROR,
                error: {
                    code: 400,
                    message: 'Данные не найдены'
                }
            })
        }
        return res.status(200).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: {
                    data: data,
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

router.post('/createset', JWTvalidate, JWTAdminfind, async (req, res) => {
    
    console.log(await setService.createSet(req.body))
})

router.post('/createsetdata', JWTvalidate, JWTAdminfind, async (req, res) => {
    console.log(await setService.createDataSet(req.body?.data, req.body?.id_set))
})

router.post('/createsetanddataset', JWTvalidate, JWTAdminfind, async (req, res) => {
    console.log(setService.createSetAndDataSet(req.body))
})

router.delete('/deletedataset', JWTvalidate, JWTAdminfind, async (req, res) => {
    try {
        const data = await setService.deleteDataSetID(req.body?.id)
        data.count != 1 ? 
        (
            res.status(400).json({
                status: state.ERROR,
                error: {
                    code: 400,
                    error_message: error,
                    message: 'Не удалось удалить данные'
                }
            })
        ) :
        (
            res.status(400).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: {
                    data: 'Днные успешно удалены',
                }
            }}) 
        )
    } catch (error) {
        res.status(400).json({
            status: state.ERROR,
            error: {
                code: 400,
                error_message: error,
                message: 'Произошла ошибка'
            }
        })
    }
    
})

router.delete('/deletesetdb', JWTvalidate, JWTAdminfind, async (req, res) => {
    try {
        const data = await setService.deleteSetID(req.body?.id)
        data.count != 1 ? 
        (
            res.status(400).json({
                status: state.ERROR,
                error: {
                    code: 400,
                    error_message: error,
                    message: 'Не удалось удалить данные'
                }
            })
        ) :
        (
            res.status(400).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: {
                    data: 'Данные успешно удалены',
                }
            }}) 
        )
    } catch (error) {
        res.status(400).json({
            status: state.ERROR,
            error: {
                code: 400,
                error_message: error,
                message: 'Произошла ошибка'
            }
        })
    }
})

router.delete('/deletesetdbanddataset', JWTvalidate, JWTAdminfind, async (req, res) => {
    try {
        const data = await setService.deleteSetDBAndDataSet(req.body?.id)
        data.count != 1 ? 
        (
            res.status(400).json({
                status: state.ERROR,
                error: {
                    code: 400,
                    error_message: error,
                    message: 'Не удалось удалить данные'
                }
            })
        ) :
        (
            res.status(400).json({
            status: state.SUCCESS,
            data: {
                code: 200,
                message: {
                    data: 'Данные успешно удалены',
                }
            }}) 
        )
    } catch (error) {
        res.status(400).json({
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