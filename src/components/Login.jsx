import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import styles from "../stylesheets/Login.module.css"

function Login() {

  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" }); // librería validacion form

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
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary" style={{color:'white', marginLeft:"30%"}}>Submit</button>
        </form>
      </div>

      <div className={styles.btn}>

        <button className="btn btn-primary" style={{marginLeft:"10px", color:"white"}}> <Link to="/Register"></Link> Create a acount</button>

        <button onClick={signInWithGoogle} id="btn-google">
          <img src="https://i.imgur.com/bD3SqPX.png" alt="logoGoogle"></img>
           Continue With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
