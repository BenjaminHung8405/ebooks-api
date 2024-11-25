import Joi from "joi";
// Define Collection (Name & Schema)
const CATEGORY_COLLECTION_NAME = 'categories'
const CATEGORY_COLLECTION_SHCHEMA = Joi.object({
    name: Joi.string().min(2).max(18).required().trim().strict(),
    type: Joi.string().min(2).max(18).required().trim().strict(),
});

export const categoryModel = {
    CATEGORY_COLLECTION_NAME,
    CATEGORY_COLLECTION_SHCHEMA,
}