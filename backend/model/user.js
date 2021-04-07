const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique:true,
        required: [true,"enter an email"],
        validate:[isEmail, "enter a valid email"]
    },
    password: {
        type: String,
        minLength: [6, "password should be 6 characters long"],
        required:[true,"enter password"]
    }

})
userSchema.post("save", function (doc, next) {
    console.log("User created", doc);
    next()
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}



const User = mongoose.model("user", userSchema);
module.exports = User;

module.exports=mongoose.model("user", userSchema);
