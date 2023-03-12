let joi = require('joi');


module.exports = {
    confirmPasswordVlidation : {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow:['com','hhh']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "please enter an email",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "please enter a password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z, 1-9,special characters"
            }) 
        })
    },
    addUserValidation: {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow:['com','hhh']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "please enter an email",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "please enter a password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z, 1-9,special characters"
            }),
             firstName: joi.string().empty().required().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid First Name",
                "string.empty" : "FirstName cannot be empty",
                "any.required" : "please enter a FirstName",
                "string.pattern.base" : "please enter a valid FirstName A-Z,a-z, 1-9,special characters"
             }),
             lastName: joi.string().empty().required().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid Last Name",
                "string.empty" : "LastName cannot be empty",
                "any.required" : "please enter a LastName",
                "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
             }),
             userName: joi.string().empty().required().alphanum().min(5).max(20).messages({
                "string.base" : "please enter a valid UserName",
                "string.empty" : "UserName cannot be empty",
                "any.required" : "please enter a UserName",
                "string.alphanum" : "please enter  Valid UserName",
                "string.min" : "please enter a UserName Between 5 and 20 Characters",
                "string.max" : "please enter a UserName Between 5 and 20 Characters"
             }),
             age: joi.number().min(10).max(120).required().messages({
                "number.base" : "please enter a valid age",
                "number.min" : "age must be between 10 and 120",
                "number.max" : "age must be between 10 and 120",
                "any.required" : "please enter your Age",
             }),
             isActive : joi.boolean().optional().messages({
                "boolean.base" : "please enter a valid is active status",  
             }),
             favTeams: joi.alternatives().required().try(
                joi.string().empty().required().messages({
                    "string.base" : "please enter a valid TeamName",
                    "string.empty" : "TeamName cannot be empty",
                    "any.required" : "please enter a TeamName"
                }),
                joi.array().min(2).required().items(joi.string().empty().required().messages({
                    "string.base" : "please enter a valid TeamName",
                    "string.empty" : "TeamName cannot be empty",
                    "any.required" : "please enter a TeamName"
                })).messages({
                    "array.base" : "please enter valid Teams",
                    "array.empty" : "Teams cannot be empty",
                    "array.min" : "Enter at least one team",
                    "any.required" : "Enter at least one team"
                })
                ).messages({
                "any.required" : "Enter at least one team"
                })
        })
    },
    updateUserValidation: {
        body: joi.object().optional().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow:['com','hhh']}}).empty().optional().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "please enter an email",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().optional().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "please enter a password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z, 1-9,special characters"
            }),
             firstName: joi.string().empty().optional().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid First Name",
                "string.empty" : "FirstName cannot be empty",
                "any.required" : "please enter a FirstName",
                "string.pattern.base" : "please enter a valid FirstName A-Z,a-z, 1-9,special characters"
             }),
             lastName: joi.string().empty().optional().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid Last Name",
                "string.empty" : "LastName cannot be empty",
                "any.required" : "please enter a LastName",
                "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
             }),
             userName: joi.string().empty().optional().alphanum().min(5).max(20).messages({
                "string.base" : "please enter a valid UserName",
                "string.empty" : "UserName cannot be empty",
                "any.required" : "please enter a UserName",
                "string.alphanum" : "please enter  Valid UserName",
                "string.min" : "please enter a UserName Between 5 and 20 Characters",
                "string.max" : "please enter a UserName Between 5 and 20 Characters"
             }),
             age: joi.number().min(10).max(120).optional().messages({
                "number.base" : "please enter a valid age",
                "number.min" : "age must be between 10 and 120",
                "number.max" : "age must be between 10 and 120",
                "any.required" : "please enter your Age",
             }),
             isActive : joi.boolean().optional().messages({
                "boolean.base" : "please enter a valid is active status",  
             }),
             favTeams: joi.alternatives().required().try(
                joi.string().empty().optional().messages({
                    "string.base" : "please enter a valid TeamName",
                    "string.empty" : "TeamName cannot be empty",
                    "any.required" : "please enter a TeamName"
                }),
                joi.array().min(2).optional().items(joi.string().empty().optional().messages({
                    "string.base" : "please enter a valid TeamName",
                    "string.empty" : "TeamName cannot be empty",
                    "any.required" : "please enter a TeamName"
                })).messages({
                    "array.base" : "please enter valid Teams",
                    "array.empty" : "Teams cannot be empty",
                    "array.min" : "Enter at least one team",
                    "any.required" : "Enter at least one team"
                })
             ).messages({
                "any.required" : "Enter at least one team"
             })
        })
    }
}