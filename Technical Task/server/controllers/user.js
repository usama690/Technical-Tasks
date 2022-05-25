const { AsyncHandler } = require("../middlewares/async");
const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
exports.signupUser = AsyncHandler(async (req, res, next) => {
    const { fullName, password: plainTextPassword, email } = req.body;

    const userName = await User.findOne({ email });
    if (!fullName) return res.status(200).json({ success: false, message: "Please add a fullName", });
    if (userName) return res.status(200).json({ success: false, message: "This user already exist with this email please try another one", });
    if (typeof fullName !== "string") return res.status(200).json({ success: false, message: "Invalid username" });
    if (!plainTextPassword || typeof plainTextPassword !== "string") return res.status(200).json({ success: false, message: "Invalid password" });
    if (plainTextPassword.length < 8) return res.status(200).json({ success: false, message: "Password too small. Should be atleast 8 characters", });

    const password = await bcrypt.hash(plainTextPassword, 10);
    const user = new User({
        fullName,
        password,
        email,
    });
    let data = await user.save()
    return res.status(201).json({ data, message: "Registered Successfully", success: true });
})

//login users
exports.signinUser = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email }).select("+password +tokens");
    if (!loginUser) return res.status(200).json({ success: false, message: "Invalid email" });

    const isValid = await bcrypt.compare(password, loginUser.password);
    if (!isValid) return res.status(200).json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
        {
            id: loginUser._id,
            email: loginUser.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
    if (loginUser.tokens) {
        if (!loginUser.tokens.includes(token)) loginUser.tokens = [...loginUser.tokens, token];
    }
    else loginUser.tokens = [token];

    const result = await loginUser.save();
    const data = loginUser._doc;
    result.password = undefined
    delete data.tokens;
    return res.status(200).json({ success: true, data: result, token, message: "login-successfully" });
});
