import express from 'express'
import { userRoute } from './userRoute'
import { bookRoute } from './bookRoute'
import { chapterRoute } from './chapterRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs V1 are ready to use.' })
})

Router.use('/users',userRoute)

Router.use('/books', bookRoute)

Router.use('/chapters', chapterRoute)

export const APIs_V1 = Router