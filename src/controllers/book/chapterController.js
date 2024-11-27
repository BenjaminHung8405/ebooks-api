import { StatusCodes } from "http-status-codes"
import { chapterService } from "~/services/book/chapterService"

const createNew = async (req, res ,next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)
    const createChapter = await chapterService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createChapter)
  } catch (error) { next(error) }
}

const getDetails = async (req, res ,next) => {
  try {
    const chapterId = req.params.id
    
    const chapter = await chapterService.getDetails(chapterId)
    res.status(StatusCodes.OK).json(chapter)
  } catch (error) { next(error) }
}

export const chapterController = {
    createNew,
    getDetails
}