import Joi from "joi";
import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from "mongodb";

// Define Collection (Name & Schema)
const CHAPTER_COLLECTION_NAME = 'chapters'
const CHAPTER_COLLECTION_SHCHEMA = Joi.object({
    name: Joi.string().required().min(1).max(100).trim().strict(),
    chapterUrl: Joi.array().items(Joi.string().uri()),
    bookId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
});

const validateBeforeCreate = async (data) => {
    return await CHAPTER_COLLECTION_SHCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        console.log('Valid Data: ', validData)
        const createdBoard = await GET_DB().collection(CHAPTER_COLLECTION_NAME).insertOne(validData)
        return createdBoard
    } catch (error) { throw new Error(error) }
}

const getDetails = async (id) => {
    try {
        const result = await GET_DB().collection(CHAPTER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result
    } catch (error) { throw new Error(error) }
}

export const chapterModel = {
    CHAPTER_COLLECTION_NAME,
    CHAPTER_COLLECTION_SHCHEMA,
    getDetails,
    createNew
}