import Joi from 'joi'

export const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required()
    })

    return (schema.validate(data))
}