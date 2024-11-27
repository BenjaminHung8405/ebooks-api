import Joi from "joi";
import { GET_DB } from "~/config/mongodb"
// Define Collection (Name & Schema)
const BANNER_COLLECTION_NAME = 'banners'
const BANNER_COLLECTION_SHCHEMA = Joi.object({
    bannerUrl: Joi.string().min(1).required()
});

const getDetails = async (id) => {
    try {
            const result = await GET_DB().collection(BANNER_COLLECTION_NAME).find({}).toArray()
        return result
    } catch (error) { throw new Error(error) }
}

export const bannerModel = {
    BANNER_COLLECTION_NAME,
    BANNER_COLLECTION_SHCHEMA,
    getDetails
}