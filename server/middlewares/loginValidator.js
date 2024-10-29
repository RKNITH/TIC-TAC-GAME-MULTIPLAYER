import Joi from 'joi'

export const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    })

    return (schema.validate(data))
}