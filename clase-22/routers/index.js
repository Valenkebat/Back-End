import  Router from "express";
const router = Router();

import productsRouter from './productsRouter.js'
import chatRouter from './chatRouter.js' //lo manejo desde app.js porque me da error
import fakerRouter from './fakerRouter.js'
import sessionRouter from './sessionRouter.js'

router.use('/productos', productsRouter)
router.use('/chat', chatRouter)
router.use('/', fakerRouter)
router.use('/', sessionRouter)

export default router;