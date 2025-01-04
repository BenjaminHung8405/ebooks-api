import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
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
        description: Joi.string().required().min(1).trim().strict(),
        shortDescription: Joi.string().required().min(1).max(2000).trim().strict(),
        rate: Joi.number().required().min(0).max(5)
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