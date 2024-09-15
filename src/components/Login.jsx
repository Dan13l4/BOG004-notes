import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import logo from "./img/logo.png"
import styles from "../stylesheets/Login.module.css"

function Login() {

  const [hasError, setHasError] = useState("");

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPass] = useState("");

  let Navigate = useNavigate();

  const loginIn = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        Navigate("/Wall");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setHasError('El usuario o la contraseña son incorrectas');
      });
  };

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result)
        const name = result.user.displayName;
        const email = result.user.email;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        Navigate("/Wall")
    })

    .catch((error) => {
        console.log(error)
        setHasError("No se ha podido iniciar con google")
    });
};
  
  return (
    <div>
      <div  className={styles.Login}>
        <img src={logo} alt="logoTakeYourNote" width="300" height="180" className={styles.logo} />
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Enter email" 
            onChange={(ev) => setEmail(ev.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input 
            type="password" 
            className="form-control" 
            id="exampleInputPassword1" 
            placeholder="Password"
            onChange={(ev) => setPass(ev.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary" style={{color:'white', marginLeft:"30%"}} onClick={loginIn}>Enter</button>
        </form>
        <div className={styles.btn}>

        <Link to="/Register" className="btn btn-primary" style={{color:"white", marginLeft:"50px", marginRight:"50px"}}> Create a acount</Link>

        <button onClick={signInWithGoogle} id="btn-google" className="btn btn-primary" style={{color:"white", marginLeft:"50px", marginRight:"50px"}}>
          <img src="https://i.imgur.com/bD3SqPX.png" alt="logoGoogle" className={styles.googleLogo}></img> Continue With Google
        </button>
      </div>
      <p>{hasError}</p>
      </div>
    </div>
  );
}

export default Login;
