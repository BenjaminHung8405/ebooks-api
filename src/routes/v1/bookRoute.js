import express from 'express'
import { bookValidation } from '~/validations/bookValidation'
import { bookController } from '~/controllers/bookController'

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(200).json({ message: 'Note: API get list books.' })
    })
    
    .post(bookValidation.createNew, bookController.createNew)

Router.route('/:id')
    .get(bookController.getDetails)
    .put() // update

export const bookRoute = Router