import React, {useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/Register.module.css"

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user, setUser] = useState("");

  const [hasError, setHasError] = useState("");

  let Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const auth = getAuth();

  const submit = () =>{
    createUserWithEmailAndPassword(auth, email, password, user)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      Navigate("/")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      setHasError("No se ha podido crear el usuario")
      // ..
    });
  }
  
  return (
    <div className={styles.Register}>
      <h2 className={styles.h2}>Create a new User</h2>
        <form className="form-login" onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input 
              type="email"
              id='email'
              name='email'
              className='form-control'
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              onChange={(ev) => setEmail(ev.target.value)} 
            />
          </div>

          <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
            <input
                id="password" // input para el password
                type="password"
                name="password"
                placeholder="Enter you password"
                className="form-control"
                onChange={(ev) => setPass(ev.target.value)}
                />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">User Name</label>
            <input 
              type="text"
              id='user'
              name='user'
              placeholder='Enter your user'
              className='form-control'
              onChange={(ev) => setUser(ev.target.value)} 
            />
          </div>
          <button onClick={submit} className="btn btn-primary" style={{marginLeft:"50px", marginRight:"50px"}}>Registrarse</button>
        </form>
        <Link to="/" className="btn btn-primary" style={{marginLeft:"50px", marginRight:"50px", marginTop:"10px"}}>Volver</Link>
        <p>{hasError}</p>
    </div>
  );
}

export default Register;