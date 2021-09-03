import React, { useState } from 'react';
import { 
    getSourceUrl,
    getStringNoLocale,
    getThingAll
} from "@inrupt/solid-client";
import { CheckIfValid } from '../utils/checkIfValid';
import { GetCertifFile } from '../utils/getCertifFile';

const TEXT_PREDICATE = "http://schema.org/text";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";


function CertifItem({thing, userWebId, session}){
    const [valid, setValid] = useState("")
    const [issuer, setIssuer] = useState("")

    //setCertif(GetCertifFile(thing.url, session))
    //temp fix to get data for checking if valid, should be done by extracting data from certificate, not this way
    const certifId = thing.url.split("/")[4].slice(0, -4);
 
    
    const handleValidate = async () => {
        const thingData = getThingAll(await GetCertifFile(thing.url, session))[0]
        const issuerId = getStringNoLocale(thingData, PERSON_PREDICATE)
        console.log('isserId', issuerId)
        setIssuer(issuerId)
        //const certifId = getStringNoLocale(thingData, TEXT_PREDICATE)
        const res = await CheckIfValid(userWebId, certifId, issuerId, session)
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
            <span>{!issuer? null : issuer}</span>
            <span>{valid}</span>
            <button onClick={handleValidate}>Validate</button>
        </div>
    );
}

export default CertifItem;