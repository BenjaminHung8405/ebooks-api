import { StatusCodes } from "http-status-codes";
import { bannerModel } from "~/models/bannerModel";

const getDetails = async (req, res ,next) => {
    try {
      const banner = await bannerModel.getDetails()
      res.status(StatusCodes.OK).json(banner)
    } catch (error) { next(error) }
  }

export const bannerController = {
  getDetails,
};
