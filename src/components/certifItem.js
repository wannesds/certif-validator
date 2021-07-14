import React, { useState } from 'react';
import { 
    getStringNoLocale,
} from "@inrupt/solid-client";
import { CheckIfValid } from '../utils/checkIfValid';

const TEXT_PREDICATE = "http://schema.org/text";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";

function CertifItem({thing, userWebId}){
    const [valid, setValid] = useState("")

    const certifId = getStringNoLocale(thing, TEXT_PREDICATE)
    const hash = getStringNoLocale(thing, SHA1_PREDICATE)
    
    const handleValidate = async () => {
        console.log("before check", certifId, userWebId)
       const res = await CheckIfValid(userWebId, certifId)
       setValid(res)
    }

    return(
        <tr> 
            <td>{certifId}</td>
            <td>{hash}</td> 
            <td>{valid}</td>         
            <button onClick={handleValidate}>Validate</button>
        </tr>
    );
}

export default CertifItem;