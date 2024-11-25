import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().min(1).max(64).trim(),

        email: Joi.string().email().required(),
        password: Joi.string().required(),
    
        createdAt: Joi.date().timestamp('javascript').default(Date.now),
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