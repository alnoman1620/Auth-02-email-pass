import React, { useState } from "react";
import Layout from "./Layout/Layout";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/firebase";

const auth = getAuth(app);
const Login = () => {
const [success, setSuccess] = useState(false)
const [userEmail, setUserEmail] = useState('')
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
   
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        const user = result;
        console.log(user)
        setSuccess(true)
        // ...
      })
      .catch((error) => {
        console.error('error', error)
      });
  };



const handleEmailBlur = event =>{
    const email = event.target.value;
    setUserEmail(email)
    console.log(email)
}



  const handlePassReset =()=>{
    if(!userEmail){
        alert('Enter your mail')
        return;
    }
    sendPasswordResetEmail(auth, userEmail)
    .then(() => {
        // Password reset email sent!
        alert('Reset pass link send in your email')
      })
      .catch((error) => {
       console.log("error", error)
      });
    
  }
  return (
    <Layout>
      <div className="mx-auto w-50">
        <h2>Please Login Here</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3 ">
            <label for="formGroupExampleInput" className="form-label">
              Email:
            </label>
            <input
                onBlur={handleEmailBlur}
              type="email"
              name="email"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput2" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter your password"
              required
            />
          </div>
          {success && <p className="text-primary">Login Successfull</p>}
          <p>Forget password? <button onClick={handlePassReset} className="btn btn-link">Please Reset</button></p>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        <p className="text-success">
          <small>New to this website?</small> Please{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
