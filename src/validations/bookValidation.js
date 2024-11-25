import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        categoryIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ).default([]),
        authorIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ).default([]),
    
        publisherIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ).default([]),
        publisherYear: Joi.number().max(4).strict(),
    
        title: Joi.string().required().min(1).max(50).trim().strict(),
        description: Joi.string().required().min(1).max(255).trim().strict(),
        
        createdAt: Joi.date().timestamp('javascript').default(Date.now),
        updatedAt: Joi.date().timestamp('javascript').default(null),
        _destroy: Joi.boolean().default(false)
    });

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
} 

export const bookValidation = {
    createNew
}