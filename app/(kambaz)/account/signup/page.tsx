// import Link from "next/link";
// export default function Signup() {
//     return (
//         <div id="wd-signup-Screen">
//             <h3>Sign up</h3>
//             <input placeholder="username" className="wd-username" /> <br />
//             <input placeholder="password" type="password" className="wd-password"/><br/>
//             <input placeholder="verify password"
//              type="password" className="wd-password-verify" /><br/>
//       <Link  href="profile" > Sign up </Link><br />
//       <Link  href="signin" > Sign in </Link>
//     </div>
// );}

// import Link from "next/link";
// export default function Signin() {
//     return (
//      <div id="wd-signin-screen">
//      <h3> Sign in</h3>
//      <input placeholder="username" className="wd-username" /> <br />
//      <input placeholder="password" type="password" className="wd-password" /> <br />
//      <Link href="/dashboard" id="wd-signin-btn"> Sign in </Link> <br />
//      <Link href="signup" id="wd-signup-link"> Sign up </Link>
//    </div>
// );}

import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/><br />
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/><br />
      <FormControl id="wd-password-verify"
             placeholder="verify password" type="password"
             className="mb-2"/><br />
      <Link id="wd-signin-btn"
            href="/account/profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link><br />
      <Link id="wd-signin-link" href="/account/signin">Sign in</Link>
    </div> );}
            
 
