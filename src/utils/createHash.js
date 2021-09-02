import MerkleTree from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';

function CreateHash(webId, certifId, issuerId) {
    const leaves = [webId, certifId, issuerId].map(x => SHA256(x))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')

    return(root);
}

export default CreateHash;



