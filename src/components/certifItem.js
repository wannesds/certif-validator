import React, { useState } from 'react';
import { 
    getStringNoLocale,
} from "@inrupt/solid-client";
import { CheckIfValid } from '../utils/checkIfValid';

const TEXT_PREDICATE = "http://schema.org/text";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";

function CertifItem({thing}){
    const [valid, setValid] = useState("")
    const certifId = getStringNoLocale(thing, TEXT_PREDICATE)
    const webId = getStringNoLocale(thing, PERSON_PREDICATE)
    
    const handleValidate = () => {
       CheckIfValid(certifId, webId, (res => {
           setValid(res)
       }))
    }

    return(
        <tr>
            <td>{certifId}</td>
            <td>{webId}</td>
            <td>{valid}</td>
            <button onClick={handleValidate}>Validate</button>
        </tr>
    );
}

export default CertifItem;