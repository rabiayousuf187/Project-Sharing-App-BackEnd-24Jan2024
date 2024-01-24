const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const router = express.Router();
const Users = require("../models/users");
const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET_KEY == ", SECRET_KEY)

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getUser = async (req, res) => {
    const allUsers = await Users.find();
    return res.send(allUsers);
}

const addUser = async (req, res) => {
    let newUser = req.body;
    const {
        firstName,
        lastName,
        email,
        password,
        role
    } = req.body;

    let hashedPassword = bcrypt.hashSync(password, 8);
    console.log(newUser)
    
    try {
        
        // console.log("RX PROFILE URL === ", profileImg)
        // Check Email Format
        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await Users.findOne({ email: email });
        
        
        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: `Invalid password format. Password must:
                - Be at least 8 characters long
            - Contain at least one uppercase letter (A-Z)
            - Contain at least one number (0-9)
            - Contain at least one special character (!@#$%^&*)` });
        }

        // if (Object.keys(newUser).length < 4) {
        //     return res.status(422).json({ message: "User data is incomplete." });
        // }
        
        // if(profileImg){
            //     upload.single('profileImg')
        // }
        if (existingUser) {
            console.log("User already exists.");
            return res.status(400).json({ message: 'User already Exist' })
        }
        else {
                const user = await Users.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    role: role
                });

                console.log("SETTED USER DATAc===", user);

                if (user) {
                    var token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    return res.status(200).send({ auth: true, token: token, user: user });
                }
            // });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "There was a problem registering the user." });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        console.log(req)
        const email = req.query.email;

        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }
        const token = req.headers['x-access-token'];
        console.log(token)
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        const decode = jwt.verify(token, SECRET_KEY)
        console.log(decode);
        const user = await Users.findOne({ email });
        if (user) {
            if (user.email === decode.email) {
                return res.status(200).send({ user });
            }
            else {
                return res.status(403).send("Forbidden to access user.");
            }
        }
        else {
            return res.status(404).send("User not found.");
        }
    } catch (err) {
        return res.status(500).send("Error fetching user.");
    }
}

const deleteUser = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found.");
        }

        const deleteUser = await Users.deleteOne(user);
        if (deleteUser) {
            return res.status(200).send(`${email} deleted successfully.`);
        }
    } catch (err) {
        return res.status(500).send("Error deleting user.");
    }
}

const updateUser = async (req, res) => {
    try {
        const email = req.query.email;
        const newPassword = req.body.password;
        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found.");
        }
        const updateDocument = {
            $set: {
                password: newPassword,
            },
        };
        const updateUser = await Users.updateOne(user, updateDocument);
        if (updateUser) {
            return res.status(200).send(`${email} updated successfully.`);
        }
    } catch (err) {
        return res.status(500).send("Error updating user.");
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: 'Invalid Password' });

        var token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, {
            expiresIn: 86400 // expires in 24 hours
        });
        console.log("Successfully loged in...")
        return res.status(200).json({ auth: true, token: token, user: user });

    }
    catch (err) {
        if (err) return res.status(500).json({message:'Error on the server.'});
    }
}

module.exports = { getUser, addUser, getUserByEmail, deleteUser, updateUser, loginUser };
