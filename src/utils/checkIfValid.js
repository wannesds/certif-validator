import CreateHash  from '../utils/createHash';
import { FetchEthApi } from './fetchEthApi';

export async function CheckIfValid({certifId, webId}){
    try {
        const dataArray = [
            certifId,
            webId
        ]
        const user = window.ethereum.selectedAddress;
        const apiOption = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=`;
        const array = await FetchEthApi(apiOption)
        //console.log('checkIfValid :' , chainData, chainData.txnList)
        const hash = CreateHash(dataArray)
        //checks if qued certificate hash is included in a Txn on-chain
        //this means the certif is stored succesfully on-chain
        const validTxn = array.result.find((resTxn) => resTxn.input === '0x' + hash)
        const state = validTxn ? true : false

        return "yes"
    } catch {
        console.log("checkIfValid has failed")
        return "no";
    }
    
}
