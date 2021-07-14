import CreateHash  from '../utils/createHash';
import { FetchEthApi } from './fetchEthApi';

export async function CheckIfValid(webId, certifId){
    try {
        //need to get Eth adress from issuer from somewhere
        const issuer = "0xB1AA7075aC982fab1AC7a0A8fb70772490C6f5ef";
        const apiOption = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${issuer}&startblock=0&endblock=99999999&sort=asc&apikey=`;
        const array = await FetchEthApi(apiOption)
        //console.log('checkIfValid :' , chainData, chainData.txnList)
        console.log("certifId and webId", certifId, webId)
        const hash = CreateHash(webId, certifId)
        //checks if qued certificate hash is included in a Txn on-chain
        //this means the certif is stored succesfully on-chain
        console.log("hash", hash)
        const validTxn = array.result.find((resTxn) => resTxn.input === '0x' + hash)
        console.log("validTxn", validTxn)
        const state = validTxn ? "yes" : "no"

        return state;
    } catch {
        console.log("checkIfValid has failed")
        return "failed";
    }
    
}
