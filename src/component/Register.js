import React from 'react';



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase';
import { Link } from 'react-router-dom';
import Layout from './Layout/Layout';


const auth = getAuth(app);

const Register = () => {
    const [passError, setPassError] = useState('')
    const [success, setSuccess] = useState(false)
    const handleRegister = (event) => {
    
      // event.preventDefault() this is for not reloading the page
      event.preventDefault()
      setSuccess(false)
      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const password =form.password.value
      console.log(email,password,name)

      //validate pass
      if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setPassError('please insert 2 capital letter')
        return;
      }
      setPassError('')
    
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result;
        console.log(user)
        setSuccess(true)
        form.reset()
        verifyEmail()
        updateUserName(name)
      })
      .catch((error) => {
        console.error('error', error)
        setPassError(error.message)
        
        // ..
      });
    }

    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    alert('please check your email and varify')
  });
    }

    const updateUserName =(name)=>{
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            console.log('name update')
          }).catch((error) => {
            console.error('error', error)
          });
    }
    return (
       <Layout>
         <div className=" w-50 mx-auto">
        <h2 className="text-primary">Please Register</h2>
        <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name:</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Name" required/>
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required/>
                
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required/>
              </Form.Group>
              <p className="text-danger">{passError}</p>
              {success && <p className="text-success">User Created Successfully</p>}
              <Button variant="primary" type="submit">
                Register
              </Button>
              <p>Already have an account? <Link to="/login">Click here</Link></p>
            </Form>
              {/* <form onSubmit={handleRegister}>
                <input onBlur={handleEmailChange} type="email" name="email" id="" placeholder="Your Email"/>
                <br></br>
                <input onBlur={handlePassChange} type="password" name="password" id="" placeholder="Your Password"/>
                <br></br>
                <button type="submit">Register</button>
              </form> */}
            </div>
       </Layout>
    );
};

export default Register;