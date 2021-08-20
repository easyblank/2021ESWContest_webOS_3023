import React, {useState}from "react";
import { authService, firebaseInstance } from "../firebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [myError, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name == "email"){
            setEmail(value)
        } else if (name==="password"){
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                //create account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            } else {
                //log in
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data)
        } catch(error) {
            // console.log(error);
            setError(error.message);
        }

    };
    const toggleAccount = () => setNewAccount((prev)=> !prev);
    const onSocialClick = async(event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if (name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name = "email" type = "email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name = "password" type = "password" placeholder="password" required value={password} onChange={onChange}/>
                <input type = "submit" value={newAccount ? "Create Account" : "Sign In"} />
                {myError}
            </form>
            <span onClick = {toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    )
};

export default Auth;
