import { StatusCodes } from "http-status-codes"
import { userModel } from "~/models/userModel"
import ApiError from "~/utils/ApiError"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import tokenData from "~/controllers/userController"

const createNew = async (reqBody) => {
  try {
    const newUser = {
        ...reqBody,
        // slug: slugify(reqBody.title)
    }

    const registerUser = await userModel.createNew(newUser)

    // const getNewUser = await userModel.findOneById(registerUser.insertedId)
    // console.log(getNewBoard)

    return registerUser
  } catch (error) {
    throw error
  }
}

const findByEmail = async (email) => { 
  try { const user = await userModel.findUserByEmail(email); 
    if (!user) { 
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!'); 
    } 
    return user; 
  } catch (error) { throw error; } 
};

const authenticateUser = async (email, password) => { 
  try { 
    const user = await userModel.findUserByEmail(email); 
    if (!user) { 
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email!'); 
    } 
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) { 
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password!'); 

    } 
    return user; 
  } catch (error) { throw error; } 
};

const getDetails = async (userId) => {
  try {
    const user = await userModel.getDetails(userId)
    if(!user){
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }
      
    return user
  } catch (error) {
    throw error
  }
}

const generateToken = async (tokenData,secretKey,jwt_expire) => {
  return jwt.sign(tokenData,secretKey,{expiresIn: jwt_expire});
}

export const userService = {
    createNew,
    getDetails,
    findByEmail,
    authenticateUser,
    generateToken
}