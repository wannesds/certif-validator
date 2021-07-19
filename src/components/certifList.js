import React from 'react';
import CertifItem from './certifItem';


function CertifList({certifThings, userWebId}){

 
       console.log("certifs2", certifThings)

    return(
        <div className="table-container">
            <span className="tasks-message">
            There {certifThings.length === 1 ? "is" : "are"} {certifThings.length} certificate{certifThings.length === 1 ? "" : "s"} to be validated.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        {/* <th>WebID</th> */}
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