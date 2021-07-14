import React, {useEffect, useState} from 'react';
import { 
    getThingAll,
    getUrl,
    getDatetime,
    getStringNoLocale,
    getStringByLocaleAll,
} from "@inrupt/solid-client";
import CertifItem from './certifItem';
//import CheckIfValid from '../utils/checkIfValid';
//import { CheckIfStored } from '../utils/checkIfStored';

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";


function CertifList({certifs}){
    console.log("certifs", certifs)

    const certifThings = certifs.sort((a, b) => {
        return (
          getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
        );
    });
    
    return(
        <div className="table-container">
            <span className="tasks-message">
            There are {certifThings.length} certificates to be validated.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                        <th>Valid</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { !certifThings ? <span>no</span>
                        : certifThings.map( (item, index) => 
                            <CertifItem 
                                thing={item}
                                key={index}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CertifList;