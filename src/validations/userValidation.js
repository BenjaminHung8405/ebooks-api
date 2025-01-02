import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().min(1).max(64).trim(),
    
        email: Joi.string().email().required(),
        password: Joi.string().min(1).required(),
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

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
} 

export const userValidation = {
    createNew
}