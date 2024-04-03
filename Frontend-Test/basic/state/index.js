import SOUNDBOUND from "../../artifacts/contracts/SoundboundToken.sol/SoundboundToken.json" with { type: "json" }
let account;
const web3 = new Web3("https://sepolia.infura.io/v3/9522458e32254478965be26d71bfaf88");

const verifierAddress = '0x0f670Fdb84de5356B14000297668be50675A79eA'
const organizationCode = 'IIG'

async function logTicket() {
    await connectMetaMask();
    // const response = await fetch("http://localhost:3001/tickets").then((res) => res.json());
    // console.log("ACCOUNT", account)
    // console.log(response);
    const contract = new web3.eth.Contract(SOUNDBOUND.abi, account);
    // contract.methods.addVerifier(verifierAddress, organizationCode)
    //     .send({ from: account, gas: 500000 })
    //     .then(receipt => {
    //         console.log('Verifier added successfully:', receipt);
    //     })
    //     .catch(error => {
    //         console.error('Error adding verifier:', error);
    //     });
    contract.methods.isVerifier(verifierAddress)
        .call()
        .then(isVerifier => {
            console.log('Is verifier:', isVerifier);
        })
        .catch(error => {
            console.error('Error checking verifier:', error);
        });
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
document.getElementById('fetchTicket').addEventListener("click", logTicket);
document.getElementById('connect-button').addEventListener('click', connectMetaMask)




