/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes"
import { bookService } from "~/services/bookService"

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

const getDetails = async (req, res ,next) => {
  try {
    const boardId = req.params.id
    
    const board = await bookService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

export const bookController = {
    createNew,
    getDetails
}