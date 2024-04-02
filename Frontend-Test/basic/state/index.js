import SOUNDBOUND from "../../artifacts/contracts/SoundboundToken.sol/SoundboundToken.json" with { type: "json" }

// web3 lib instance
const web3 = new Web3(window.ethereum);
const contractAddress = '0xED877A7B3c30ed50e983b7B9a26524C1C4c0eB02'; // Thay YOUR_CONTRACT_ADDRESS bằng địa chỉ của smart contract Solidity của bạn
const contract = new web3.eth.Contract(SOUNDBOUND.abi, contractAddress);
export async function signData() {
    console.log("HELLo")
    const data = document.getElementById("data").value;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const signature = await web3.eth.personal.sign(data, accounts[0]);
    document.getElementById("signature").value = signature;
}

export async function recoverAddress() {
    const data = document.getElementById("data").value;
    const signature = document.getElementById("signature").value;
    const recoveredAddress = await web3.eth.personal.ecRecover(data, signature);
    document.getElementById("recoveredAddress").value = recoveredAddress;
}
document.getElementById('sign').addEventListener('click', signData)
document.getElementById('recover').addEventListener('click', recoverAddress)
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




