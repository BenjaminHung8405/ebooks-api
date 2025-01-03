import Joi from "joi";
import { Double, ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { chapterModel } from "./chapterModel";
// Define Collection (Name & Schema)
const BOOK_COLLECTION_NAME = 'books'
const BOOK_COLLECTION_SHCHEMA = Joi.object({
    title: Joi.string().required().min(1).max(50).trim().strict(),
    // description: Joi.string().required().min(1).max(255).trim().strict(),
    // content: Joi.string().required().min(1),

    // authorId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    categoryIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),
    chapterIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    // publishedAt: Joi.date(),
    coverImage: Joi.string().required().min(1),
    author: Joi.string().required().min(1).max(64).trim(),
    rate: Joi.number().required().min(0).max(5)
});

const validateBeforeCreate = async (data) => {
    return await BOOK_COLLECTION_SHCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdBoard = await GET_DB().collection(BOOK_COLLECTION_NAME).insertOne(validData)
        return createdBoard
    } catch (error) { throw new Error(error) }
}

const findOneById = async (id) => {
    try {
        const result = await GET_DB().collection(BOOK_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result
    } catch (error) { throw new Error(error) }
}

const getAllDetails = async () => {
    try {
            const result = await GET_DB().collection(BOOK_COLLECTION_NAME).find({}).toArray()
        return result
    } catch (error) { throw new Error(error) }
    // try {
    //     const result = await GET_DB().collection(BOOK_COLLECTION_NAME).aggregate([
    //         { $match: {} },
    //         { $lookup: {
    //             from: chapterModel.CHAPTER_COLLECTION_NAME,
    //             localField: '_id',
    //             foreignField: 'bookId',
    //             as: 'chapters'
    //         } }
    //     ]).toArray()
    //     console.log(result);
    //     return result[0] || {} 
    // } catch (error) { throw new Error(error) }
}

const getDetails = async (id) => {
    try {
        // const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        const result = await GET_DB().collection(BOOK_COLLECTION_NAME).aggregate([
            { $match: {
                _id: new ObjectId(id),
            } },
            { $lookup: {
                from: chapterModel.CHAPTER_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'bookId',
                as: 'chapters'
            } }
        ]).toArray()
        return result[0] || {} 
    } catch (error) { throw new Error(error) }
}

export const bookModel = {
    BOOK_COLLECTION_NAME,
    BOOK_COLLECTION_SHCHEMA,
    createNew,
    findOneById,
    getDetails,
    getAllDetails
}