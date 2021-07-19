import './App.css';
import React, {useEffect, useState } from "react";
import { 
  LoginButton, 
  LogoutButton, 
  Text, 
  useSession, 
  CombinedDataProvider, 
} from "@inrupt/solid-ui-react";
import { getSolidDataset, getThingAll } from "@inrupt/solid-client";
import UserForm from './components/userForm';
import CertifList from './components/certifList';
import CssBaseline from '@material-ui/core/CssBaseline';

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

const authOptions = {
  clientName: "Certif-Validator App",
};

function App() {

  const { session } = useSession();
  const [userWebId, setUserWebId] = useState("");
  const [certifs, setCertifs] = useState('')
  const [oidcIssuer, setOidcIssuer] = useState("");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      try {
        const certifset = await getSolidDataset(`https://${userWebId}/certificates/index.ttl`, { 
          fetch : session.fetch 
        });
        const certifList = certifset ? getThingAll(certifset) : [];

      // const certifList = await FetchCertifs(`https://ksbuser.solidcommunity.net/certificates/index.ttl`, session)
        console.log("certifs" , certifList)
        setCertifs(certifList)
      } catch(error) {
        console.log("fetch failed", error);
      }
   
    })();

  }, [session, session.info.isLoggedIn, userWebId]);



  return (
    <div className="app-container">
      <CssBaseline />
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
              <LogoutButton
                onLogout={() => window.location.reload()}
              />
          </div>
          <div className="content">
            <UserForm
              setUserWebId={setUserWebId}
              setCertifs={setCertifs}
              session={session}
            />
            <span>{ !userWebId ? null : `Certificates from : ${userWebId} `}</span>
            <CertifList
              certifThings={certifs}
              userWebId={`https://${userWebId}/profile/card#me`}
            />
          </div>
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