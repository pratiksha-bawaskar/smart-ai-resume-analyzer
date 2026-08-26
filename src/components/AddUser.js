import React, { useState } from "react";
import { createUser } from "../services/api";

function AddUser({ setUserId, setUserName }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {

    if (!name || !email || !password) {
      alert("Please enter name, email and password");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
      skills: ""
    };

    try {
      const data = await createUser(user);

      alert("User Created: " + name + " 🎉");

      setUserId(data.id);
      setUserName(name);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("CREATE USER ERROR:", error);
      alert("Error creating user");
    }
  };

  return (
    <div>

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

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleCreateUser}>
        Create User
      </button>

    </div>
  );
}

export default AddUser;