// const jwt = require('jsonwebtoken');
// const User = require('../model/user');

// exports.protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
//     }

//     try {
//         // Token verify karein
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // User ko find karein, aur ensure karein ke password select na ho (waise select: false model mein hai)
//         req.user = await User.findById(decoded.id);
        
//         if (!req.user) {
//             return res.status(404).json({ success: false, message: 'User no longer exists' });
//         }

//         // Middleware agle step (controller) par jane ki ijazat deta hai
//         next();
//     } catch (error) {
//         return res.status(401).json({ success: false, message: 'Session expired, login again' });
//     }
// };


const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.protect = async (req, res, next) => {
    let token;


    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
     
        req.user = await User.findById(decoded.id).select('-password'); 
        
        if (!req.user) {
            return res.status(404).json({ success: false, message: 'User no longer exists' });
        }

        next();
    } catch (error) {
     
        const message = error.name === 'TokenExpiredError' ? 'Session expired, login again' : 'Invalid token';
        return res.status(401).json({ success: false, message });
    }
};