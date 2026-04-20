"use client";
import Link from "next/link";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { redirect } from "next/navigation";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl value={user.username} 
      onChange={(e) => setUser({ ...user, username: e.target.value })} 
             placeholder="username"
             className="wd-username mb-2"/>
             {/* <br /> */}
      <FormControl value={user.password} 
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
             {/* <br /> */}
      <FormControl id="wd-password-verify"
             placeholder="verify password" type="password"
             className="mb-2"/>
             {/* <br /> */}
       <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />

      {/* <Link id="wd-signin-btn"
            href="/account/profile"
            className="btn btn-primary w-100 mb-2">
            Sign up 
            </Link> */}
            {/* <br /> */}
      <Link id="wd-signin-link" href="/account/signin">Sign in</Link>
    </div> );}
            
 
