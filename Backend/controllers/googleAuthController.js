const { OAuth2Client } = require('google-auth-library');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

// OAuth2Client ko initiate karein (ek baar)
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) return res.status(400).json({ success: false, message: "Token missing" });
   
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, given_name, family_name } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            // Yahan Mongoose 'pre-save' hook password ko hash kar dega
            user = await User.create({
                firstName: given_name,
                lastName: family_name,
                email,
                password: Math.random().toString(36).slice(-10), 
                isGoogleUser: true,
                phone: null // Explicitly null taake check kar sakein
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        });

        // Phone check logic
        const needsPhoneUpdate = !user.phone;

        res.status(200).json({
            success: true,
            token,
            user: { 
                id: user._id, 
                email: user.email, 
                firstName: user.firstName,
                phone: user.phone
            },
            needsPhoneUpdate 
        });

    } catch (error) {
        console.error("❌ GOOGLE AUTH FAILED:", error.message);
        res.status(401).json({ success: false, message: "Authentication failed" });
    }
};