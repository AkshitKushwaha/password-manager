import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [text, setText] = useState("Show");

  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text"
    setText((text) => (text === "Show" ? "Hide" : "Show"));
    if(text === "Hide"){
      passwordRef.current.type = "password"
    } else {
      passwordRef.current.type = "text"
    }
  };

  const savePassword = () => {
    //console.log(form);
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    //console.log([...passwordArray, form]);
    setForm({site: "", username: "", password: ""})
  };

  const deletePassword = (id) => {
    let c = confirm(`Are you sure you want to delete this password?`);
    if(c){
      console.log();
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm(passwordArray.filter(item => item.id === id)[0]);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="mx-auto mycontainer">
        <h1 className="text-center text-purple-600 text-4xl font-bold">
          <span className="text-blue-900">&lt;</span>
          PassCard
          <span className="text-blue-900">/&gt;</span>
        </h1>
        <p className="text-blue-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-blue-900 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
            placeholder="Website URL"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-blue-900 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
              placeholder="Username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-blue-900 w-full p-4 py-1"
                type="password"
                name="password"
                id=""
                placeholder="Password"
                ref = {passwordRef}
              />
              <span
                className="absolute right-0 cursor-pointer px-2 py-1"
                onClick={() => showPassword()}
              >
                {text}
              </span>
            </div>
          </div>
          <button
            onClick={() => savePassword()}
            className="flex justify-center items-center  bg-purple-400 hover:bg-purple-600 rounded-full px-3 py-3 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/wwweikvd.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-2">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {

                return <tr key={index}>
                <td className="text-center w-32 border border-white"><a href={item.site} target="_blank">{item.site}</a></td>
                <td className="text-center w-32 border border-white">{item.username}</td>
                <td className="text-center w-32 border border-white">{item.password}</td>
                <td className="text-center w-32 border border-white">
                  <span className="cursor-pointer mx-2" onClick={() => deletePassword(item.id)}>
                    Delete
                  </span>
                  <span className="cursor-pointer mx-2" onClick={() => editPassword(item.id)}>
                    Edit
                  </span>
                </td>
              </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;
