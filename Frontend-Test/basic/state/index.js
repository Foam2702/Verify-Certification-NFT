import SOUNDBOUND from "../../artifacts/contracts/SoundboundToken.sol/SoundboundToken.json" with { type: "json" }

// web3 lib instance
const web3 = new Web3(window.ethereum);
const contractAddress = '0xED877A7B3c30ed50e983b7B9a26524C1C4c0eB02'; // Thay YOUR_CONTRACT_ADDRESS bằng địa chỉ của smart contract Solidity của bạn
const contract = new web3.eth.Contract(SOUNDBOUND.abi, contractAddress);
async function logTicket() {
    const response = await fetch("http://localhost:3001/tickets")
        .then((res) => res.json());
    console.log(response);
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
document.getElementById('sign').addEventListener('click', signData)
document.getElementById('recover').addEventListener('click', recoverAddress)
document.getElementById('fetchTicket').addEventListener("click", logTicket);
document.getElementById('connect-button').addEventListener('click', event => {
    let account;
    let button = event.target
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        account = accounts[0];
        console.log(account)
        button.textContent = account;
        ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }).then(result => {
            console.log(result)
            let wei = parseInt(result, 16);
            let balance = wei / (10 ** 18);
            console.log(balance + "ETH")
        })
    })
})




