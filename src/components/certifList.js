import React, {useEffect, useState} from 'react';
import { 
    getThingAll,
    getUrl,
    getDatetime,
    getStringNoLocale,
    getStringByLocaleAll,
} from "@inrupt/solid-client";
import CertifItem from './certifItem';


function CertifList({certifs, userWebId}){

 
    const certifThings = certifs ? getThingAll(certifs) : [];
       console.log("certifs2", certifThings)

    return(
        <div className="table-container">
            <span className="tasks-message">
            There are {certifThings.length} certificates to be validated.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>Hash</th>
                        <th>Valid</th>
                    </tr>
                </thead>
                <tbody>
                    { !certifThings ? <tr></tr>
                        : certifThings.map( (item, index) => 
                            <CertifItem 
                                thing={item}
                                userWebId={userWebId}
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