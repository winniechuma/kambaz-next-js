<<<<<<< Updated upstream
import Link from "next/link";
export default function Signin() {
    return (
     <div id="wd-signin-screen">
     <h3> Sign in</h3>
     <input placeholder="username" className="wd-username" /> <br />
     <input placeholder="password" type="password" className="wd-password" /> <br />
     <Link href="/dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="signup" id="wd-signup-link"> Sign up </Link>
   </div>
=======
// "use client";

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { setCurrentUser } from "../reducer";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import * as db from "../../database";
// import { FormControl, Button } from "react-bootstrap";
// export default function Signin() {
//   const [credentials, setCredentials] = useState<any>({});
//   const dispatch = useDispatch();
//   const signin = () => {
//     const user = db.users.find (
//       (u:any) =>
//         u.username === credentials.username &&
//       u.password === credentials.password
//     );
//     if (!user) 
//       return;
//     dispatch(setCurrentUser(user));
//     redirect("/dashboard");
//   };
//   return (
//     <div id="wd-signin-screen">
//       <h1>Sign in</h1>
//       <FormControl defaultValue = {credentials.username}
//       onChange ={(e) => setCredentials ({ ...credentials, username:
//         e.target.value})} 
//         id="wd-username"
//              placeholder="username"
//              className="mb-2"/><br />
//       <FormControl defaultValue={credentials.password}
//              onChange={(e) => setCredentials({ ...credentials, password: 
//               e.target.value })} id="wd-password"
//              placeholder="password" type="password"
//              className="mb-2"/><br />
//       <Button onClick = {signin} id="wd-signin-btn"
      
//             className="btn btn-primary w-100 mb-2">
//             Sign in </Button><br />
//       <Link id="wd-signup-link" href="/account/signup">Sign up</Link>
//     </div> );}

            
 
"use client";
import Link from "next/link";
import {useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../database";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
 const [credentials, setCredentials] = useState<any>({});
 const dispatch = useDispatch();

 const router = useRouter(); 
 const signin = () => {
  console.log("all users:", db.users); // ← add this
  console.log("credentials:", credentials);
   const user = db.users.find(
     (u: any) =>
       u.username === credentials.username &&
       u.password === credentials.password
   );
    console.log("found user:", user); 
   if (!user) return;
   dispatch(setCurrentUser(user));
  //  redirect("/dashboard");
   router.push("/dashboard");
 };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" href="/account/signup"> Sign up </Link>
    </div>
>>>>>>> Stashed changes
);}
