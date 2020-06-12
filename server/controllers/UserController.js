require('dotenv').config()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {

    static register(req,res,next) {
        
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        

        User.findOne({
            where: {
                email: newUser.email
            }
        })
            .then(data => {
                if (data) {
                    next({ str_code: 'EMAIL_EXIST'})
                } else {
                    return User.create(newUser)
                }
        
            })
            .then(() => {
                return res.status(201).json({ msg: 'Successfully created new user' })
            })
            .catch(err => {
                
                if (err.errors) {
                    const err_data = err.errors.map(el => el.message)
                    next({ str_code: 'PASSWORD_FORMAT', err_data })
                    
                } else {
                    next({ str_code: 'INTERNAL_SERVER_ERROR'})
                }
            })

    }

    static login(req, res, next) {
        const { email } = req.body
        const { password } = req.body

        User.findOne({
            where: { email }
        })
        .then(data => {
            if (data) {
                if (bcrypt.compareSync(password, data.password)) {
                    const access_token = jwt.sign({
                        id: data.id,
                        email: data.email
                    }, process.env.JWT_KEY)
                    
                    return res.status(200).json({
                        id: data.id,
                        email: data.email,
                        access_token
                    })
                } else {
                    next({ str_code: 'INCORRECT_PASSWORD'})
                }
            } else {
                next({ str_code: 'EMAIL_NOT_FOUND'})
            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR'})
        })
    }

    static googleSignIn(req,res,next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const { id_token } = req.body
        let email

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email

                return User.findOne({
                    where: { email }
                })
            })
            .then(data => {
                if (data)  {
                    return {
                        id: data.id,
                        email: data.email
                    }
                } else {
                    const newUser = {
                        email,
                        password: 'pass1234'
                    }

                    return User.create(newUser)
                    
                }
            })
            .then(data => {
                const access_token = jwt.sign({
                    id: data.id,
                    email: data.email
                }, process.env.JWT_KEY)


                return res.status(200).json({
                    data: {
                        id: data.id,
                        email: data.email,
                        access_token
                    }
                })
            })
            .catch(err => {
                next({ str_code: 'INTERNAL_SERVER_ERROR'})
            })

    }
}

module.exports = UserController