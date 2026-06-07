import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../../Store/useAuthStore';

const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');


    const result = await googleLogin(credentialResponse.credential);
    setIsLoading(false);

    if (result.success) {
      if (result.needsPhoneUpdate) {
        navigate('/complete-profile');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error || 'Google Authentication Failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Phone ko required list se hata dein
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields (First name, Last name, Email, Password).');
      return;
    }

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    // Yahan phone bhejein, agar empty hai to backend use null handle kar lega
    const result = await register(formData);
    setIsLoading(false);

    if (result.success) navigate('/');
    else setError(result.error || 'Registration failed');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Create Account</h2>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}


        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Sign-In failed.')}
            useOneTap
          />
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white px-3 text-xs font-bold text-slate-400">OR</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full border border-slate-300 h-10 px-3 text-sm rounded bg-slate-50" />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full border border-slate-300 h-10 px-3 text-sm rounded bg-slate-50" />
          </div>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border border-slate-300 h-10 px-3 text-sm rounded bg-slate-50" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone (Optional)" // User ko clarity milegi
            onChange={handleChange}
            className="w-full border border-slate-300 h-10 px-3 text-sm rounded bg-slate-50"
          />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border border-slate-300 h-10 px-3 text-sm rounded bg-slate-50" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full border border-slate-300 h-10 px-3 text-sm rounded bg-slate-50" />

          <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white font-bold h-11 rounded text-sm hover:bg-slate-800 transition-colors">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;