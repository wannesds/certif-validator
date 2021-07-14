import { 
    getSolidDataset
} from "@inrupt/solid-client";

export async function FetchCertifs(input, session){
    try {
        const certifList = await getSolidDataset(input, { 
          fetch : session.fetch 
        });
        console.log("certifListDataset 2", certifList)
        return certifList;
    } catch {
        console.log("fetchcertifs has failed")
    }
}
