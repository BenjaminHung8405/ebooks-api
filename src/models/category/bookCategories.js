import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
// Define Collection (Name & Schema)
const BOOKCATE_COLLECTION_NAME = 'book_categories'
const BOOKCATE_COLLECTION_SHCHEMA = Joi.object({
    bookId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
});

export const bookcateModel = {
    BOOKCATE_COLLECTION_NAME,
    BOOKCATE_COLLECTION_SHCHEMA,
}