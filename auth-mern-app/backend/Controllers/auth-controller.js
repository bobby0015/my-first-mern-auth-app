const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(name, email, password)

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User Already Exists", success: false });
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const newUser = await UserModel.create({
                        name,
                        email,
                        password: hash
                    })
                    console.log(newUser)
                    return res.status(201).json({ message: "User Created Successfully", success: true });
                });
            });
        }
    } catch (err) {
        // Handle any error that occurs during the process
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const login = async (req,res) => {
    const {email,password} = req.body

    const user = await UserModel.findOne({email});

    if(!user){
        return res.status(409).json({message:"User not Found",success:false})
    }else{
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({
                    email:user.email,
                    id:user._id},
                    process.env.SECRET_KEY,
                    {expiresIn:'24h'}
                )

                return res.status(201).json({
                    message:"User Loggedin Successfully",
                    success:true,
                    name:user.name, 
                    email:user.email,
                    token:token
                })
            }else{
                return res.status(409).json({message:"Password is Inccorect",success:false})
            }
        });
    }
}

module.exports = {
    signup,
    login
};
