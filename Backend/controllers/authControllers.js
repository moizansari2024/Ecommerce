const User = require('../model/user');
const jwt = require('jsonwebtoken');


const getPublicProfile = (user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || null, // Agar nahi hai to null bhej dein
    isProfileCompleted: !!(user.phone) // True tabhi hoga jab phone hoga
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
};

// SIGNUP
exports.signup = async (req, res) => {
    try {
        // Phone ko optional handle karein
        const { firstName, lastName, email, password, phone } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: 'Email already registered' });

        // Agar phone nhi aaya, to wo 'undefined' save hoga, jo ki thik hai
        const newUser = await User.create({ 
            firstName, 
            lastName, 
            email, 
            password, 
            phone: phone || null // Agar phone nahi hai to null store karein
        });
        
        res.status(201).json({ success: true, token: generateToken(newUser._id), user: getPublicProfile(newUser) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email }).select('+password');
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//         res.status(200).json({ success: true, token: generateToken(user._id), user: getPublicProfile(user) });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`🔑 LOGIN ATTEMPT: Email - ${email}`);

        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.comparePassword(password))) {
            console.warn(`⚠️ LOGIN FAILED: Invalid credentials for ${email}`);
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        console.log(`✅ LOGIN SUCCESS: User ${user._id} logged in.`);
        
        res.status(200).json({ 
            success: true, 
            token: generateToken(user._id), 
            user: getPublicProfile(user) 
        });
    } catch (error) {
        console.error(`❌ LOGIN ERROR: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};
// UPDATE PROFILE
// completeProfile
exports.completeProfile = async (req, res) => {
    try {
        // req.body mein sirf 'phone' ya aur bhi fields ho sakti hain
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ 
            success: true, 
            user: getPublicProfile(updatedUser) // Check karein ye function 'phone' return karta hai
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// controllers/userController.js

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        console.log(`🔍 UPDATE REQUEST: User ID ${userId} is trying to update:`, updateData);

        // Database update
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.warn(`⚠️ UPDATE FAILED: User ${userId} not found.`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log(`✅ UPDATE SUCCESSFUL: User ${userId} updated.`);

        res.status(200).json({ 
            success: true, 
            user: getPublicProfile(updatedUser) 
        });

    } catch (error) {
        console.error(`❌ UPDATE ERROR: User ${req.user.id} - ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.status(200).json({ success: true, user: getPublicProfile(user) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};