import React, { useState } from 'react';
import { 
    getStringNoLocale,
} from "@inrupt/solid-client";
import { CheckIfValid } from '../utils/checkIfValid';

const TEXT_PREDICATE = "http://schema.org/text";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";

function CertifItem({thing, userWebId, session}){
    const [valid, setValid] = useState("")

    //setCertif(GetCertifFile(thing.url, session))
    //temp fix to get data for checking if valid, should be done by extracting data from certificate, not this way
    const certifId = thing.url.split("/")[4].slice(0, -4);
 
    
    const handleValidate = async () => {
        console.log("before check", userWebId)
       const res = await CheckIfValid(userWebId, certifId)
       setValid(res)
    }

    return(
        // <tr> 
        //     <td>{userWebId.split("/")[2]}</td>
        //     <td>{thing.url.split("/")[4].slice(0, -4)}</td>
        //     {/* <td>{userWebId}</td> */} 
        //     <td>{valid}</td>         
        //     <button onClick={handleValidate}>Validate</button>
        // </tr>
        <div className="certificate">
            <span>{certifId}</span>
            {valid}
            <button onClick={handleValidate}>Validate</button>
        </div>
    );
}

export default CertifItem;