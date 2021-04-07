const User = require('../model/user')
const jwt = require('jsonwebtoken')


const handleError = (err) => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	if (err.message === "incorrect email") {
		errors.email = "that email is not registered";
		return errors;
	}

	if (err.message === "incorrect password") {
		errors.password = "that password is not registered";
		return errors;
	}

	if (err.code === 11000) {
		errors.email = "This email already exists";
		return errors;
	}

	if (err.message.includes("")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

const maxAge =1*24*60*60
const createToken = (id) => {
    return jwt.sign({ id }, "SecretPass321", {
        expiresIn: maxAge
    });
}


module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password })
        const token = createToken(user._id);
        res.cookie("utok", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).send({ user: user._id, message: "created" });

    }
    catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {

	const { email, password } = req.body;


	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		
	
			res.cookie("utok", token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(200).send({ token, message: "logged" });
	
	} catch (err) {
		const errors = handleError(err);
		res.status(400).json({ errors });
	}
};