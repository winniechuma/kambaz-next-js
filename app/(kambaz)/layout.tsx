"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
<<<<<<< Updated upstream
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
   <table>
     <tbody>
       <tr>
         <td valign="top" width="200">  <KambazNavigation /> </td>
         <td valign="top" width="100%"> {children}           </td>
       </tr>
     </tbody>
   </table>
=======
import "./styles.css";
import { Provider } from "react-redux";
import store from "./store";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
  <Provider store={store}>
 <div id="wd-kambaz">
  <div className="d-flex">
    <div>
      <KambazNavigation />
    </div>
    <div className="wd-main-content-offset p-3 flex-fill">
      {children}
    </div>
  </div>
</div>
</Provider>
>>>>>>> Stashed changes
);}
