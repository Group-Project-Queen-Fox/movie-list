module.exports = (err,req,res,next) => {

    let err_code, err_msg, str_code

    switch (err.str_code) {
        case 'EMAIL_NOT_FOUND':
            err_code = 400
            err_msg = 'Email not found'
            break
        case 'EMAIL_EXIST':
            err_code = 400
            err_msg = 'Email already exist'
            break
        case 'INCORRECT_PASSWORD':
            err_code = 400
            err_msg = 'Incorrect password'
            break
        case 'PASSWORD_FORMAT':
            err_code = 400
            err_msg = err.err_data
            break
        case 'TOKEN_NOT_FOUND':
            err_code = 404
            err_msg = 'Token not found'
            break
         case 'USER_NOT_FOUND':
            err_code = 404
            err_msg = 'User not found'
            break
        case 'INVALID_TOKEN':
            err_code = 400
            err_msg = 'Invalid Token'
            break
        case 'INTERNAL_SERVER_ERROR':
            err_code = 500
            err_msg = 'Internal server error'
            break
            
        default:
            err_code = 400
            str_code = 'API_ERROR'
            err_msg = 'Api error'
    }

    res.status(err_code).json({
        err_code,
        str_code,
        err_msg
    })
}