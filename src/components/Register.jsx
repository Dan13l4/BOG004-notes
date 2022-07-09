import React, {useState} from 'react';
import "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebaseApp } from "reactfire"
import { useNavigate } from "react-router-dom";

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
      // ..
    });
  }
  
  return (
    <div className="Register">
      <div>
      <div>
        <form className="form-login" onSubmit={handleSubmit} noValidate>

          <div>
              email
            <input 
              type="email"
              id='email'
              name='email'
              placeholder='Enter your email'
              className='email'
              onChange={(ev) => setEmail(ev.target.value)} 
            />
          </div>

          <div>
                password
            <input
                id="password" // input para el password
                type="password"
                name="password"
                placeholder="Contraseña"
                className="password"
                onChange={(ev) => setPass(ev.target.value)}
                />
          </div>

          <div>
                user
            <input 
              type="text"
              id='user'
              name='user'
              placeholder='Enter your user'
              className='user'
              onChange={(ev) => setUser(ev.target.value)} 
            />
          </div>
          {hasError && {hasError}}
          <button onClick={submit}>Registrarse</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Register;