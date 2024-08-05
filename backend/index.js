const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs")

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const registrationSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required.'] 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required.'] 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required.'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required.'],
        unique: true
    },
    mobile: { 
        type: String, 
        required: [true, 'Mobile number is required.'],
        unique: true
    },
    address: { 
        type: String, 
        required: [true, 'Address is required.'] 
    }
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/basics/index.html");
});

app.post("/register", async (req, res) => {
    const { firstName, lastName, password, email, mobile, address } = req.body;

    try {
        const existingUser = await Registration.findOne({ $or: [{ email }, { mobile }] });

        if (existingUser) {
            let errorMessage = '';
            if (existingUser.email === email) {
                errorMessage = 'Email is already registered.';
            }
            if (existingUser.mobile === mobile) {
                errorMessage = errorMessage ? errorMessage + ' Mobile number is already registered.' : 'Mobile number is already registered.';
            }
            return res.status(400).json({ error: errorMessage });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const registrationData = new Registration({
            firstName,
            lastName,
            password: hashedPassword, 
            email,
            mobile,
            address,
        });

        await registrationData.save();
        res.redirect("/success");
    } catch (error) {
        console.error("Registration error:", error);
        res.redirect("/error");
    }
});


app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/basics/success.html");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/basics/error.html");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
