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
      <form className="form">
        <label htmlFor="User WebID">
            <span>Fill in a user webID</span>
          <input
            id="webID-input"
            type="text"
            //value={todoText}
            placeholder='ksbuser.solidcommunity.net'
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