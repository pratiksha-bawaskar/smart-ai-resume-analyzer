import React, { useState } from "react";
import { createUser } from "../services/api";

function AddUser({ setUserId, setUserName }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = async () => {

    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    // ✅ FIXED USER OBJECT
    const user = {
      name: name,
      email: email,
      skills: "" // 🔥 IMPORTANT ADD
    };

    try {
      const data = await createUser(user);

      alert("User Created: " + name + " 🎉");

      setUserId(data.id);
      setUserName(name);

      // ✅ optional: clear inputs after success
      setName("");
      setEmail("");

    } catch (error) {
      console.error("CREATE USER ERROR:", error);
      alert("Error creating user");
    }
  };

  return (
    <div className="card">

      <h2>Create User</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleCreateUser}>
        Create User
      </button>

    </div>
  );
}

export default AddUser;