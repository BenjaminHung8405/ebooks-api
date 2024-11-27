import express from 'express'
import { bookValidation } from '~/validations/book/bookValidation'
import { bookController } from '~/controllers/book/bookController'

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(200).json({ message: 'Note: API get list books.' })
    })
    
    .post(bookValidation.createNew, bookController.createNew)

Router.route('/get').get(bookController.getAllDetails)

Router.route('/:id')
    .get(bookController.getDetails)
    .put() // update

export const bookRoute = Router