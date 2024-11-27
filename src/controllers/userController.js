import { StatusCodes } from "http-status-codes"
import { userService } from "~/services/userService"
import bcrypt from "bcryptjs"
import ApiError from "~/utils/ApiError"

const createNew = async (req, res ,next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)
    const { name,email,password } = req.body



    const salt = await(bcrypt.genSalt(10))
    const hashPassword = await bcrypt.hash(password,salt)

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const registerUser = await userService.createNew(userData)

    res.status(StatusCodes.CREATED).json(registerUser)
  } catch (error) { next(error); }
}

const login = async (req, res ,next) => {
  try {
    const { email,password } = req.body

    const existingUser = await userService.authenticateUser(email,password)
    if (!existingUser) {
      throw new ApiError(        
        401,
        "This email has not been registered.",
      );
    }
    
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new ApiError(        
        401,
        "This password is not valid",
      );
    }
    
    let tokenData = { _id:existingUser._id, email:existingUser.email }
    const token = await userService.generateToken(tokenData,'secretKey','7d')

    res.status(200).json({ status:true,token:token })

  } catch (error) { next(error); }
}

const getDetails = async (req, res ,next) => {
  try {
    const userId = req.params.id
    
    const user = await userService.getDetails(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) { next(error) }
}


export const userController = {
    createNew,
    getDetails,
    login,
}