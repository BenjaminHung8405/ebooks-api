import express from 'express'
import { bannerController } from '~/controllers/book/bannerController'

const Router = express.Router()

Router.route('/banner').get(bannerController.getDetails)

export const APIs_V2 = Router