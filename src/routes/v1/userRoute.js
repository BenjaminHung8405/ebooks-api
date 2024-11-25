import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'

const Router = express.Router()

Router.route('/registration').post(userValidation.createNew, userController.createNew)

Router.route('/login').post(userController.login)

Router.route('/:id')
    .get(userController.getDetails)
    .put() // update

export const userRoute = Router