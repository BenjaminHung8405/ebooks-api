import { StatusCodes } from "http-status-codes";
import { authorModel } from "~/models/authorModel";

const getDetails = async (req, res ,next) => {
    try {
      const author = await authorModel.getDetails()
      res.status(StatusCodes.OK).json(author)
    } catch (error) { next(error) }
  }

export const authorController = {
  getDetails,
};
