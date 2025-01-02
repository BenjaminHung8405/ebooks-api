import express from 'express'
import { authorController } from '~/controllers/book/authorController'
import { bannerController } from '~/controllers/book/bannerController'

const Router = express.Router()

Router.route('/banner').get(bannerController.getDetails)
Router.route('/author').get(authorController.getDetails)

export const APIs_V2 = Router