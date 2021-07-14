import React, {useState } from "react";
import { 
    getSolidDataset,
    getThingAll
} from "@inrupt/solid-client";
import { FetchCertifs } from "../utils/fetchCertifs.js"

function UserForm({setUserWebId, setCertifs, session}) {
    
    const [input, setInput] = useState("");

    const handleFetch = async (e) => {
        e.preventDefault();
        // try {
        // const certifList = await FetchCertifs(input, session)
        // const certifThings = certifList ? getThingAll(certifList) : [];
        // setCertifs(certifThings)
        setUserWebId(input)
        // } catch {
        // console.log("dataset fetch failed")
        // }
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