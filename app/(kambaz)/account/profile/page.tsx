<<<<<<< Updated upstream
import Link from "next/link";
=======
"use client";
import { useEffect, useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
>>>>>>> Stashed changes
export default function Profile() {
   const [profile, setProfile] = useState<any>({});
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 const fetchProfile = () => {
   if (!currentUser) return redirect("/account/signin");
   setProfile(currentUser);
 };
 const signout = () => {
   dispatch(setCurrentUser(null));
   redirect("/account/signin");
 };
 useEffect(() => {
   fetchProfile();
 }, []);

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
<<<<<<< Updated upstream
      <input defaultValue="alice" placeholder="username" className="wd-username"/><br/>
      <input defaultValue="123"   placeholder="password" type="password"
             className="wd-password" /><br/>
      <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
      <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
      <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
      <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
      <select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </select><br/>
      <Link href="signin" > Sign out </Link>
=======
      {profile && (
        <div>
      
      <FormControl defaultValue={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value }) } 
       className="wd-username"/><br/>
      <FormControl defaultValue={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value }) } 
       className="wd-password" /><br/>
      <FormControl defaultValue={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) } 
       id="wd-firstname" /><br/>
      <FormControl defaultValue={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } 
       id="wd-lastname" /><br/>
      <FormControl defaultValue={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} 
      type="date" id="wd-dob" /><br/>
      <FormControl defaultValue={profile.email}  onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
      type="email" id="wd-email" /><br/>
      <FormSelect defaultValue="USER" id="wd-role"
       onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
        
        <option value="USER">User</option>       
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> 
        <option value="STUDENT">Student</option>
      </FormSelect><br/>
      <Button onClick={signout}  id="wd-signout-btn" className="w-100 mb-2"> Sign out </Button>
>>>>>>> Stashed changes
    </div>
      )}
      </div>
);}
