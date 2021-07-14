import { 
    getSolidDataset
} from "@inrupt/solid-client";

export async function FetchCertifs(input, session){
    try {
        const userUrl = `https://${input}/certificates/index.ttl`
        console.log("userUrl", userUrl)
        const certifList = await getSolidDataset(userUrl, { 
          fetch : session.fetch 
        });
        console.log("certifListDataset", certifList)
        return certifList;
    } catch {
        console.log("fetchcertifs has failed")
    }
}
