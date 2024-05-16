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
        console.log(SOULBOUND_ADDRESS)
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
                const result = await contract.getVerifiersByOrganizationCode(e.target.elements.issuer_organization.value);
                console.log(result);

            } catch (error) {
                console.error('Error:', error);
            }

        }
    }
    const handleGetAllOrganization = async (e) => {
        e.preventDefault()
        const { ethereum } = window
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
            try {
                // const result = await contract.getOrganizationCodes;
                // console.log(result);
                const result = await contract.getOrganizationCodes();
                console.log(result);

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
                <label >Get Issuer from Organization:</label>
                <input type="text" name="issuer_organization" />
                <br />
                <button type="submit">Get</button>

            </form>
            <form onSubmit={handleGetAllOrganization}>
                <label >Get All Organization:</label>

                <button type="submit">Get</button>

            </form>

        </div >
    );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// function App() {
//     const [socket, setSocket] = useState(null);
//     const [currentAccount, setCurrentAccount] = useState(null);
//     const [walletConnected, setWalletConnected] = useState(false);
//     const [onlineUsers, setOnlineUsers] = useState([])
//     console.log("onlineUsers", onlineUsers)

//     useEffect(() => {
//         // Check if there is a current account stored in localStorage
//         const savedAccount = localStorage.getItem('currentAccount');
//         if (savedAccount) {
//             setCurrentAccount(savedAccount);
//             setWalletConnected(true);
//         }
//     }, [currentAccount]);
//     useEffect(() => {
//         const fetchCourse = async () => {
//             try {
//                 // const courses = await fetch("https://verify-certification-nft-production.up.railway.app/courses")
//                 // console.log(courses)
//                 const courses = await fetch("https://verify-certification-nft-production.up.railway.app/tickets")
//                     .then((res) => res.json());
//                 console.log(courses)
//             } catch (e) {
//                 console.log(e.message);
//             }
//         };
//         fetchCourse();
//     }, []);
//     const connectMetaMask = async () => {
//         const { ethereum } = window;
//         if (!ethereum) {
//             console.log("Install MetaMask");
//             return;
//         }

//         try {
//             const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//             const account = accounts[0];
//             setCurrentAccount(account);
//             setWalletConnected(true);
//             localStorage.setItem('currentAccount', account);
//             // Store current account in localStorage
//             window.location.reload()

//         } catch (error) {
//             console.error("Failed to connect MetaMask:", error);
//         }
//     };
//     const handleClearLocalStorage = () => {
//         localStorage.removeItem('currentAccount');
//         setCurrentAccount(null);
//         setWalletConnected(false);
//     };
//     useEffect(() => {
//         const newSocket = io("http://localhost:8080");
//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, [currentAccount]);

//     useEffect(() => {
//         if (socket === null) return
//         socket.emit("addNewUser", currentAccount)
//         socket.on("getOnlineUsers", (res) => {
//             setOnlineUsers(res)
//         })
//         return () => {
//             socket.off("getOnlineUsers")
//         }
//     }, [socket])

//     return (
//         <div className="App">
//             <header className="App-header" />
//             <button onClick={connectMetaMask}>Connect Wallet</button>
//             <button onClick={handleClearLocalStorage}>Logout</button>
//             {walletConnected && <p>Connected Wallet: {currentAccount}</p>}
//         </div>
//     );
// }

// export default App;


