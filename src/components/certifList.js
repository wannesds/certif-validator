import React from 'react';
import CertifItem from './certifItem';


function CertifList({certifThings, userWebId, session}){

 
       console.log("certifs2", certifThings)

    return(
        <div className="table-container">
            <span className="tasks-message">
            There {certifThings.length === 1 ? "is" : "are"} {certifThings.length} certificate{certifThings.length === 1 ? "" : "s"} to be validated.
            </span>
            <div className="table holder-list">
                    { !certifThings ? null
                        : certifThings.map( (item, index) => 
                            <CertifItem 
                                thing={item}
                                userWebId={userWebId}
                                session={session}
                                key={index}
                            />
                        )
                    }
            </div>
        </div>
    );
}

export default CertifList;