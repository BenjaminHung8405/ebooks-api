import { StatusCodes } from "http-status-codes"
import { bookModel } from "~/models/bookModel"
import ApiError from "~/utils/ApiError"
const createNew = async (reqBody) => {
  try {
    const newBook = {
        ...reqBody,
        // slug: slugify(reqBody.title)
    }

    const createdBook = await bookModel.createNew(newBook)
    // console.log(createdBoard)

    const getNewBook = await bookModel.findOneById(createdBook.insertedId)
    // console.log(getNewBoard)

    return getNewBook
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const user = await bookModel.getDetails(boardId)
    if(!user){
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    return user
  } catch (error) {
    throw error
  }
}

export const bookService = {
    createNew,
    getDetails
}