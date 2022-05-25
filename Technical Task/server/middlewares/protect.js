const jwt = require('jsonwebtoken');
const { AsyncHandler } = require("../middlewares/async");
const User = require('../models/user')
const ErrorResponse = require('../utils/errorResponse');

//protect route
exports.protect = AsyncHandler(async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1]
    }
    else if (req.cookies.token) {
        token = req.cookies.token
    }
    //make sure token exist
    if (!token) {
        return next(new ErrorResponse(`Not authorized to access this route1`, 401))
    }
    try {
        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('+tokens')
        if (!req.user.tokens.includes(token))
            return next(new ErrorResponse(`Not authorized to access this route2`, 401))

        // req.token = token
        next()
    }
    catch (err) {
        console.log(err)
        return next(new ErrorResponse(`Not authorized to access this route3`, 401))
    }

})