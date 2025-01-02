import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
// Define Collection (Name & Schema)
const AUTHOR_COLLECTION_NAME = 'authors'
const AUTHOR_COLLECTION_SHCHEMA = Joi.object({
    bookId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    name: Joi.string().min(2).max(18).required().trim().strict(),
});

export const authorModel = {
    AUTHOR_COLLECTION_NAME,
    AUTHOR_COLLECTION_SHCHEMA,
}