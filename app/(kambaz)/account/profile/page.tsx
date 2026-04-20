"use client";
import { useEffect, useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "../client";

export default function Profile() {
   const [profile, setProfile] = useState<any>({});
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

 const fetchProfile = () => {
   if (!currentUser) return redirect("/account/signin");
   setProfile(currentUser);
 };
 const signout = async () => {
   await client.signout();
   dispatch(setCurrentUser(null));
   redirect("/account/signin");
 };
 useEffect(() => {
   fetchProfile();
 }, []);

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
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
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
      <Button onClick={signout}  id="wd-signout-btn" className="w-100 mb-2"> Sign out </Button>
    </div>
      )}
      </div>
);}
