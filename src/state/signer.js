import { createContext, useContext, useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { useNavigate } from "react-router-dom";
import SOULBOUND from "../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json";
const { ethers } = require("ethers");
const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS;

let SignerContext = createContext();
const useSigner = () => useContext(SignerContext);
export const SignerProvider = ({ children }) => {
    const navigate = useNavigate();

    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        const web3modal = new Web3Modal();
        if (web3modal.cachedProvider) connectWallet();
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
                console.log('MetaMask is locked');
                setAddress(null);
            } else {
                connectWallet();
            }
        });
    }, []);

    const connectWallet = async () => {
        setLoading(true);
        try {
            const web3modal = new Web3Modal({ cacheProvider: true });
            const instance = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const newContract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
            setContract(newContract);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSigner(signer);
            setAddress(address);
            setProvider(provider);

            // Set up event listener for Transfer events
            if (newContract) {
                newContract.on("Transfer", (from, to, tokenId, event) => {
                    console.log(`NFT Transfer detected: From ${from} to ${to} TokenID ${tokenId.toString()}`);
                    console.log(event);
                    if (from === address) {
                        console.log("Owner initiated transfer detected.");
                    } else {
                        console.log("Transfer by non-owner detected.");
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const contextValue = { provider, contract, signer, loading, address, connectWallet };
    return (
        <SignerContext.Provider value={contextValue}>
            {children}
        </SignerContext.Provider>
    );
};

export default useSigner;