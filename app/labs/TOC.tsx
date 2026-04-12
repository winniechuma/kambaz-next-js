import Link from "next/link";
export default function TOC() {
 return (
<<<<<<< Updated upstream
   <ul>
     <li>
       <Link href="/labs" id="wd-home-link">
         Home </Link>
     </li>
     <li>
       <Link href="/labs/lab1" id="wd-lab1-link">
         Lab 1 </Link>
     </li>
     <li>
       <Link href="/labs/lab2" id="wd-lab2-link">
         Lab 2 </Link>
     </li>
     <li>
       <Link href="/labs/lab3" id="wd-lab3-link">
         Lab 3 </Link>
     </li>
     <li>
       <Link href="/" id="wd-kambaz-link">
         Kambaz </Link>
     </li>
   </ul>
=======
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/labs" as={Link} className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}>
      Labs</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab1" as={Link} className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}>
       Lab 1</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab2" as={Link} className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}>
      Lab 2</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab3" as={Link}  className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}>
      Lab 3</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab4" as={Link}  className={`nav-link ${pathname.endsWith("lab4") ? "active" : ""}`}>
      Lab 4</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}>Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/winniechuma">My GitHub</NavLink>
     </NavItem>
   </Nav>
>>>>>>> Stashed changes
);}
