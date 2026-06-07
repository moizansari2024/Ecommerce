const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [false, 'Phone number is required'],
        trim: true
    },
    password: {
        type: String,
      
        required: function () { return !this.isGoogleUser; },
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {

    if (!this.isModified('password') || !this.password) {
        return next(); 
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);