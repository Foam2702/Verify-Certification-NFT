import SOULBOUND from "../../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json" with { type: "json" }
//import SOULBOUND_ADDRESS from "../../src/state/nft-market/config.ts"with { type: "json" }
const SOULBOUND_ADDRESS = "0xD628ce6a8CF8754083bD05b07A096D38e04465f2"

let account;
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(SOULBOUND.abi, SOULBOUND_ADDRESS);

async function logTicket() {
    await connectMetaMask();
    const response = await fetch("http://localhost:3001/tickets").then((res) => res.json());
    console.log("ACCOUNT", account)
    console.log(response);
}
async function addVerifier() {
    await connectMetaMask();
    const addr = document.getElementById("address_verfifier").value
    const org = document.getElementById("organization").value

    contract.methods.addVerifier(addr, org)
        .send({ from: account, gas: 500000 })
        .then(receipt => {
            console.log('Verifier added successfully:', receipt);
        })
        .catch(error => {
            console.error('Error adding verifier:', error);
        });
}
async function isVerifier() {
    await connectMetaMask();
    const addr = document.getElementById("is_verifier").value;
    contract.methods.isVerifier(addr)
        .call()
        .then(isVerifier => {
            console.log('Is verifier:', isVerifier);
        })
        .catch(error => {
            console.error('Error checking verifier:', error);
        });
}
async function getOrganizationCode() {
    await connectMetaMask();
    const org = document.getElementById("org_code").value;
    console.log(org)
    contract.methods.getOrganizationCode(org)
        .call((error, result) => {
            if (!error) {
                console.log("Organization code: ", result);
            } else {
                console.error("Error:", error);
            }
        })
}

async function signData() {
    const data = document.getElementById("data").value;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const signature = await web3.eth.personal.sign(web3.utils.utf8ToHex(data), accounts[0]);
    console.log(signature)
    document.getElementById("signature").value = signature;
}

async function recoverAddress() {
    const data = document.getElementById("data").value;
    const signature = document.getElementById("signature").value;
    const recoveredAddress = await web3.eth.personal.ecRecover(data, signature);
    document.getElementById("recoveredAddress").value = recoveredAddress;
}
async function connectMetaMask() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        account = accounts[0];
        ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }).then(result => {
            let wei = parseInt(result, 16);
            let balance = wei / (10 ** 18);
        })
    })
}

document.getElementById('sign').addEventListener('click', signData)
document.getElementById('recover').addEventListener('click', recoverAddress)
document.getElementById('fetch_ticket').addEventListener("click", logTicket);
document.getElementById('connect-button').addEventListener('click', connectMetaMask)
document.getElementById('addVerifier').addEventListener("click", addVerifier)
document.getElementById('isVerifier').addEventListener("click", isVerifier)
document.getElementById('getOrganizationCode').addEventListener("click", getOrganizationCode)



