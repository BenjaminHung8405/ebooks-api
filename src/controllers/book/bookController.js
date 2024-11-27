import { StatusCodes } from "http-status-codes"
import { bookService } from "~/services/book/bookService"

const createNew = async (req, res ,next) => {
  try {
    console.log('req.body', req.body)
    console.log(req.header("accessToken"));
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)
    const createBoard = await bookService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }
}

const getAllDetails = async (req, res ,next) => {
  try {
    const book = await bookService.getAllDetails()
    res.status(StatusCodes.OK).json(book)
  } catch (error) { next(error) }
}

const getDetails = async (req, res ,next) => {
  try {
    const bookId = req.params.id
    
    const board = await bookService.getDetails(bookId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

export const bookController = {
    createNew,
    getDetails,
    getAllDetails
}