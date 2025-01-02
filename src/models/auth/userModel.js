import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

// Define Collection (Name & Schema)
const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SHCHEMA = Joi.object({
    name: Joi.string().required().min(1).max(64).trim(),

    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    picture: Joi.object({
        large: Joi.string().default('https://m.media-amazon.com/images/I/31jPSK41kEL.jpg'),
        medium: Joi.string().default('https://m.media-amazon.com/images/I/31jPSK41kEL.jpg'),
        thumbnail: Joi.string().default('https://m.media-amazon.com/images/I/31jPSK41kEL.jpg'),
    }).default({
        large: 'https://m.media-amazon.com/images/I/31jPSK41kEL.jpg',
        medium: 'https://m.media-amazon.com/images/I/31jPSK41kEL.jpg',
        thumbnail: 'https://m.media-amazon.com/images/I/31jPSK41kEL.jpg'
    })
});



const validateBeforeCreate = async (data) => {
    return await USER_COLLECTION_SHCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdBoard = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
        return createdBoard
    } catch (error) { throw new Error(error) }
}

const findOneById = async (id) => {
    try {
            const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
            return result
        // const result = await GET_DB().collection(USER_COLLECTION_NAME).aggregate([
        //     { $match: {
        //         _id: new ObjectId(id),
        //         _destroy: false
        //     } },
        //     { $lookup: {
        //         from: bookModel.BOOK_COLLECTION_NAME,
        //         localField: '_id'
        //     } },
        //     {  }
        // ])
        // return result[0] || {}
    } catch (error) { throw new Error(error) }
}

const findUserByEmail = async (email) => { 
    try { 
        const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email }); 
        return user; 
    } catch (error) {
        console.error('Error finding user by email:', error.message);
        throw new Error('Error in finding user by email');
    }
};

const getDetails = async (id) => {
    try {
            const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result
    } catch (error) { throw new Error(error) }
}

export const userModel = {
    USER_COLLECTION_NAME,
    USER_COLLECTION_SHCHEMA,
    createNew,
    findOneById,
    findUserByEmail,
    getDetails
}