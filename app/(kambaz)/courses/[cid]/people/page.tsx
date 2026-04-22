"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import PeopleTable from "./Table";  // ✅ fix import path
import { findUsersForCourse } from "../../client";
import PeopleTable from "./table/page";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {          // ✅ real fetch function
    if (cid) {
      const data = await findUsersForCourse(cid as string);
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />  
    </div>
  );
}