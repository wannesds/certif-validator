import './App.css';
import React, {useEffect, useState } from "react";
import { 
  LoginButton, 
  LogoutButton, 
  Text, 
  useSession, 
  CombinedDataProvider, 
  getSolidDataset, 
  getThingAll
} from "@inrupt/solid-ui-react";
import UserForm from './components/userForm';
import CertifList from './components/certifList';

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

const authOptions = {
  clientName: "certif-validator App",
};

function App() {

  const { session } = useSession();
  const [userWebId, setUserWebId] = useState("");
  const [certifs, setCertifs] = useState([])
  const [oidcIssuer, setOidcIssuer] = useState("");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };


  return (
    <div className="app-container">
      {session.info.isLoggedIn ? ( //logged in?
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div className="message logged-in f4">
            <span>You are logged in as: </span>
              <Text 
                properties={[
                  "http://www.w3.org/2006/vcard/ns#fn",
                  "http://xmlns.com/foaf/0.1/name",
                ]} 
                className="ma2 dark-blue"
              />
              <LogoutButton/>
          </div>
          <section>
            
            <UserForm
              setUserWebId={setUserWebId}
              setCertifs={setCertifs}
              session={session}
            />
            <span>{ !userWebId ? null : `Certifications from : ${userWebId} `}</span>
            <CertifList
              certifs={certifs}
              session={session}
            />
            {/* <QueList certifList={certifList} setCertifList={setCertifList}/> */}
          </section>
        </CombinedDataProvider>
      ) : (  //if not logged in then
        <div className="message">
          <span>You are not logged in. </span>
          <span>
            Log in with:
            <input
              className="oidc-issuer-input "
              type="text"
              name="oidcIssuer"
              list="providers"
              value={oidcIssuer}
              onChange={handleChange}
            />
           <datalist id="providers">
             <option value="https://broker.pod.inrupt.com/" />
             <option value="https://inrupt.net/" />
             <option value="https://solidcommunity.net" />
           </datalist>
          </span>
          <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            authOptions={authOptions}
          />
        </div>
      )}
    </div>
  );
}

export default App;