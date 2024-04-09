import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SOULBOUND from '../src/artifacts/contracts/SoulboundToken.sol/SoulboundToken.json'
const { ethers } = require("ethers");

const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS
function App() {
    const [currentAccount, setCurrentAccount] = useState(null)
    const [formData, setFormData] = useState({
        dataSign: "",
        signature: "",
        recoveredAddress: "",
        verifier: "",
        organization: "",
        isverifier: ""
    })
    const connectMetaMask = async () => {
        const { ethereum } = window
        if (!ethereum) {
            console.log("Install MetaMask")
        }
        else {
            console.log("Wallet exists")
        }
        const account = await ethereum.request({ method: 'eth_requestAccounts' })
        setCurrentAccount(account[0])
    }

    const logTicket = async () => {
        await connectMetaMask();
        const response = await fetch("http://localhost:3001/tickets").then((res) => res.json());
        console.log(response);
    }
    const handleSignData = async (e) => {
        e.preventDefault();
        const { ethereum } = window
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
            const data = e.target.elements.data.value;
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const signature = await signer.signMessage(data, accounts[0]);
            const recoveredAddr = await ethers.utils.recoverAddress(ethers.utils.hashMessage(ethers.utils.toUtf8Bytes(data)), signature);
            setFormData(prevState => ({
                ...prevState,
                dataSign: data,
                signature: signature,
                recoveredAddress: recoveredAddr

            }))
        }
    }
    const handleAddverifier = async (e) => {
        e.preventDefault()
        const { ethereum } = window
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
            const addr = e.target.elements.verifier.value;
            const org = e.target.elements.organization.value;
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const tx = await contract.addVerifier(addr, org)
            await tx.wait();
            console.log("Verifier added successfully.");

            setFormData(prevState => ({
                ...prevState,
                verifier: addr,
                organization: org

            }))
        }
    }
    const handleIsVerifier = async (e) => {
        e.preventDefault()
        const { ethereum } = window
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
            const addr = e.target.elements.isVerifier.value;

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const checkVerifier = await contract.isVerifier(addr)
            const organization = await contract.getOrganizationCode(addr)
            console.log("organization:", organization)
            console.log(checkVerifier)
            const result = await contract.getVerifierList();
            console.log(result)
            // console.log('Verifier Addresses: ', result[0]);
            // console.log('Organization Codes: ', result[1]);
            setFormData(prevState => ({
                ...prevState,
                isverifier: checkVerifier

            }))
        }
    }
    const handleGetAllVerifier = async (e) => {
        e.preventDefault()
        const { ethereum } = window
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
            try {
                const result = await contract.getVerifierList();
                console.log('Verifier Addresses: ', result[0]);
                console.log('Organization Codes: ', result[1]);
            } catch (error) {
                console.error('Error:', error);
            }

        }
    }




    return (
        <div className="App">
            <header className="App-header" />
            <button onClick={connectMetaMask}>Connect Wallet</button>
            {currentAccount && <p>Connected Wallet: {currentAccount}</p>}

            <form onSubmit={handleSignData}>
                <label >Data:</label>
                <input type="text" name="data" />
                {formData.signature && <p>Signature: {formData.signature}</p>}
                {formData.recoveredAddress && <p>Recoverd Address: {formData.recoveredAddress}</p>}
                <br />

                <button type="submit">Sign</button>
            </form>
            <form onSubmit={handleAddverifier}>

                <label >Add verifier:</label>
                <input type="text" name="verifier" />
                <br />
                <label >Organization:</label>
                <input type="text" name="organization" />
                <br />
                <button type="submit">Add</button>

            </form>

            <form onSubmit={handleIsVerifier}>
                <label >Address:</label>
                <input type="text" name="isVerifier" />
                <br />
                <button type="submit">Check</button>
                {formData.isverifier ? "Is Verifier:True" : "Is Verifier:False"}

            </form>

            <form onSubmit={handleGetAllVerifier}>
                <button type="submit">Get</button>


            </form>


            {/* <label htmlFor="recoveredAddress">Recovered Address:</label>
      <input type="text" id="recoveredAddress" placeholder="Recovered address will appear here..." readOnly />
      <br />
      <label htmlFor="fetchTicket">Fetch Ticket:</label>
      <input type="text" id="fetchTicket" placeholder="fetch Ticket will appear here..." readOnly />
      <button onClick={logTicket}>Fetch Ticket</button>
      <br />
      <label htmlFor="addVerifier">Add Verifier:</label>
      <input type="text" id="address_verfifier" />
      <input type="text" id="organization" />
      <button onClick={addVerifier}>Add Organization</button>
      <br />
      <label htmlFor="isVerifier">Is Verifier:</label>
      <input type="text" id="is_verifier" placeholder="is Verifier will appear here..." />
      <button onClick={isVerifier}>Is Verifier</button>
      <br />
      <label htmlFor="getOrganizationCode">Get Organization Code:</label>
      <input type="text" id="org_code" />
      <button onClick={getOrganizationCode}>Get Organization Code</button> */}


        </div >
    );
}

export default App;
