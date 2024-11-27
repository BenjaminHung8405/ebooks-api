import express from 'express'
import { chapterValidation } from '~/validations/book/chapterValidation'
import { chapterController } from '~/controllers/book/chapterController'

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(200).json({ message: 'Note: API get list books.' })
    })
    
    .post(chapterValidation.createNew, chapterController.createNew)

Router.route('/:id')
    .get(chapterController.getDetails)
    .put() // update

export const chapterRoute = Router