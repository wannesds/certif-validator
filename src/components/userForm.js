import React, {useState } from "react";

function UserForm({setUserWebId}) {
    
    const [input, setInput] = useState("");

    const handleFetch = async (e) => {
        e.preventDefault();
        setUserWebId(input)
    };

    const handleChange = (e) => {   
        setInput(e.target.value) 
    };

  return (
      <form className="user-read-form">
        <label htmlFor="User WebID">
            <span>Ex: ksbuser.solidcommunity.net</span>
          <input
            id="webID-input"
            type="text"
            //value={todoText}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleFetch} className="add-button">
          Find Certificates
        </button>
      </form>
  );
}
  
  export default UserForm;