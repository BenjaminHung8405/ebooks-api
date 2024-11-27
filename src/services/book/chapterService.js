import { StatusCodes } from "http-status-codes"
import { chapterModel } from "~/models/book/chapterModel"
import ApiError from "~/utils/ApiError"
const createNew = async (reqBody) => {
  try {
    const newChapter = {
        ...reqBody,
        // slug: slugify(reqBody.title)
    }

    const createdChapter= await chapterModel.createNew(newChapter)
    // console.log(createdBoard)

    // console.log(getNewBoard)

    return createdChapter
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const chapter = await chapterModel.getDetails(boardId)
    if(!chapter){
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    return chapter
  } catch (error) {
    throw error
  }
}

export const chapterService = {
    createNew,
    getDetails
}