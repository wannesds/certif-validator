import { getStringNoLocale, getThingAll } from '@inrupt/solid-client';
import CreateHash  from '../utils/createHash';
import { FetchEthApi } from './fetchEthApi';
import { GetCertifFile } from './getCertifFile';

const TEXT_PREDICATE = "http://schema.org/text";

export async function CheckIfValid(webId, certifId, issuerId, session){
    try {
        //GetCertifFile is for getting datatset in general , shoudl rename imo
        const ethAddress = await GetCertifFile(`${issuerId}/public/eth-address.ttl`, session)
        const thing = getThingAll(ethAddress)[0]

        console.log("ethAddressExtracted", getStringNoLocale(thing, TEXT_PREDICATE))

        //need to get Eth adress from issuer from somewhere
        const issuer = getStringNoLocale(thing, TEXT_PREDICATE)
        const apiOption = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${issuer}&startblock=0&endblock=99999999&sort=asc&apikey=`;
        const array = await FetchEthApi(apiOption)
        //console.log('checkIfValid :' , chainData, chainData.txnList)
        console.log("all data for validation:", certifId, webId, issuerId)
        //user webID is used from the holder of certificate not from data in certificate itself, 
        //this should be changed incase people need to be able to present other peoples certif incase they cannot
        const hash = CreateHash(webId, certifId, issuerId)
        //checks if qued certificate hash is included in a Txn on-chain
        //this means the certif is stored succesfully on-chain
        console.log("hash", hash)
        const validTxn = array.result.find((resTxn) => resTxn.input === '0x' + hash)
        console.log("validTxn", validTxn)
        const state = validTxn ? "VALID" : "NOT VALID"

        return state;
    } catch {
        console.log("checkIfValid has failed")
        return "failed";
    }
    
}
