// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useHistory hook
// import axios from 'axios';
// import './Login.css'; // Import CSS file
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password
//   const navigate = useNavigate(); // Initialize useHistory hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:8086/api/v1/users/search/${username}`);
//       const userData = response.data;
//       if (userData.password === password) {
//         localStorage.setItem('User', JSON.stringify(userData));
//         // Redirect to the home page
//         navigate("/home")
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (error) {
//       setError('Invalid username or password');
//     }
//   };
 
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
 
//   return (
//     <div className="login-container">
//       <div className="form-container">
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-outline mb-2">
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="form-control form-control-lg"
//               placeholder="Enter your Username"
//               required
//             />
//           </div>
//           <div className="form-outline mb-3">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control form-control-lg"
//               placeholder="Enter password"
//               required
//             />
//             <span className="password-toggle" onClick={togglePasswordVisibility}>
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <button
//             type="submit"
//             className="btn btn-primary btn-lg"
//             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
//             onClick={(e)=>handleSubmit(e)}
//           >
//             Login
//           </button>
//           <div className="divider d-flex align-items-center my-4" style={{alignContent:'center', paddingLeft:'40%', paddingRight:"40%"}}>
//             <p className="text-center fw-bold mx-3 mb-0">Or</p>
//           </div>
//           <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
//             <div className="lead fw-normal mb-0 me-3" ><p>Sign in with</p></div>
//             <button type="button" className="btn btn-primary btn-floating mx-1">
//               <FaFacebookF />
//             </button>
//             <button type="button" className="btn btn-primary btn-floating mx-1">
//               <FaTwitter />
//             </button>
//             <button type="button" className="btn btn-primary btn-floating mx-1">
//               <FaLinkedinIn />
//             </button>
//           </div>
//           <p className="small fw-bold mt-2 pt-1 mb-0">
//             Don't have an account? <a href="/signup" className="link-danger">Register</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };
 
// export default Login;






// // // Login.js
 
// // import React, { useState } from 'react';
// // import {useNavigate} from "react-router-dom";
// // import axios from 'axios';
// // import './Login.css'; // Import CSS file
// // import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// // import HomePage from '../HomePage/HomePage';
 
// // const Login = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password

// //   const navigate= useNavigate();
// //   function OnButtonClick(){
// //     navigate("/home", {replace:true});
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.get(`http://localhost:8086/api/v1/users/search/${username}`);
// //       const userData = response.data;
// //       if (userData.password === password) {
// //         localStorage.setItem('User', JSON.stringify(userData));
      
// //         console.log('Login successful');
        

// //       } else {
// //         setError('Invalid username or password');
// //       }
// //     } catch (error) {
// //       setError('Invalid username or password');
// //     }
// //   };
 
// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };
 
// //   return (
// //     <div className="login-container">
// //       <div className="form-container">
// //         <form onSubmit={handleSubmit} className="login-form">
// //           <div className="form-outline mb-2">
// //             <input
// //               type="text"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="form-control form-control-lg"
// //               placeholder="Enter your Username"
// //               required
// //             />
// //           </div>
// //           <div className="form-outline mb-3">
// //             <input
// //               type={showPassword ? 'text' : 'password'}
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="form-control form-control-lg"
// //               placeholder="Enter password"
// //               required
// //             />
// //             <span className="password-toggle" onClick={togglePasswordVisibility}>
// //               {showPassword ? <FaEyeSlash /> : <FaEye />}
// //             </span>
// //           </div>
// //           {error && <div className="alert alert-danger">{error}</div>}
// //           <button
// //             type="submit"
// //             className="btn btn-primary btn-lg"
// //             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
// //             onClick={OnButtonClick}>
// //           Login
// //           </button>
// //           <div className="divider d-flex align-items-center my-4" style={{alignContent:'center', paddingLeft:'40%', paddingRight:"40%"}}>
// //             <p className="text-center fw-bold mx-3 mb-0">Or</p>
// //           </div>
// //           <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
// //             <div className="lead fw-normal mb-0 me-3" ><p>Sign in with</p></div>
// //             <button type="button" className="btn btn-primary btn-floating mx-1">
// //               <FaFacebookF />
// //             </button>
// //             <button type="button" className="btn btn-primary btn-floating mx-1">
// //               <FaTwitter />
// //             </button>
// //             <button type="button" className="btn btn-primary btn-floating mx-1">
// //               <FaLinkedinIn />
// //             </button>
// //           </div>
// //           <p className="small fw-bold mt-2 pt-1 mb-0">
// //             Don't have an account? <a href="/signup" className="link-danger">Register</a>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
 
// // export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import "./styles.css";
import * as Components from './components';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import {useNavigate} from "react-router-dom";

 
const Login = () => {
    const [signIn, toggleSignIn] = useState(true);
    const [username, setUsername] = useState({ value: '', error: false });
    const [password, setPassword] = useState({ value: '', error: false });
    const [email, setEmail] = useState({ value: '', error: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: false });
    const [userData, setUserData] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password
    const navigate= useNavigate();
        function OnButtonClick(){
            navigate("/home", {replace:true});
            };
 
    const handleSignIn = (e) => {
        e.preventDefault();
        if (!username.value || !password.value) {
            toast.error("Username and password are required");
            return;
        }
        axios.get(`http://localhost:8086/api/v1/users/search/${username.value}`)
            .then(response => {
                const userData = response.data;
                if (userData.password === password.value) {
                    console.log("Login successful");
                    localStorage.setItem('User', JSON.stringify(userData));
                    setUserData(userData);
                   
                } else {
                    console.log("Username or password is invalid");
                    toast.error("Username or password is invalid");
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error.response.data);
                toast.error(error.response.data.message || "An error occurred");
            });
    };
 
    const handleSignUp = (e) => {
        e.preventDefault();
        if (!username.value || !email.value || !password.value || !confirmPassword.value) {
            toast.error("All fields are required");
            return;
        }
        if (password.value !== confirmPassword.value) {
            toast.error("Password and confirmed password do not match");
            return;
        }
        const userData = { username: username.value, email: email.value, password: password.value };
        axios.post(`http://localhost:8086/api/v1/users/`, userData)
            .then(response => {
                console.log("User signed up successfully");
                setUserData(response.data);
                setIsSignUp(true);
            })
            .catch(error => {
                console.error("Error signing up:", error.response.data);
                toast.error(error.response.data.errors.join(', ') || "An error occurred");
            });
    };
 
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
 
    const handleInputChange = (e, field) => {
        const { value } = e.target;
        const updatedField = { value, error: false };
        switch (field) {
            case 'username':
                setUsername(updatedField);
                break;
            case 'password':
                setPassword(updatedField);
                break;
            case 'email':
                setEmail(updatedField);
                break;
            case 'confirmPassword':
                setConfirmPassword(updatedField);
                break;
            default:
                break;
        }
    };
 
    return (
        <Components.Container style={{ backgroundColor: isSignUp ? 'black' : '' }}>
            <ToastContainer /> {/* Add this line to render toast notifications */}
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSignUp}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input
                        type='text'
                        placeholder='UserName'
                        value={username.value}
                        onChange={(e) => handleInputChange(e, 'username')}
                        className={username.error ? 'error' : ''}
                    />
                    <Components.Input
                        type='text'
                        placeholder='email'
                        value={email.value}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className={email.error ? 'error' : ''}
                    />
                    <Components.Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={password.value}
                        onChange={(e) => handleInputChange(e, 'password')}
                        className={password.error ? 'error' : ''}
                    />
                    <Components.Input
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword.value}
                        onChange={(e) => handleInputChange(e, 'confirmPassword')}
                        className={confirmPassword.error ? 'error' : ''}
                    />
                    <span className="password-toggle-signup" onClick={togglePasswordVisibility}>
                       
                    </span>
             
                    <Components.Button type="submit">Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>
 
            <Components.SignInContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSignIn}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input
                        type='text'
                        placeholder='Username'
                        value={username.value}
                        onChange={(e) => handleInputChange(e, 'username')}
                        className={username.error ? 'error' : ''}
                    />
                    <Components.Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={password.value}
                        onChange={(e) => handleInputChange(e, 'password')}
                        className={password.error ? 'error' : ''}
                    />
                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                       
                    </span>
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button type="submit" onClick={OnButtonClick}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>
 
            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with your Friends please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggleSignIn(true)}>Sign In</Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome to Viblee</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggleSignIn(false)}>Sign Up</Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
};
 
export default Login;