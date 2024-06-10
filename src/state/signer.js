import { createContext, useContext, useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { useNavigate } from "react-router-dom";
import SOULBOUND from "../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json";
import { Buffer } from 'buffer'
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
    const [publicKey, setPublicKey] = useState(null);

    useEffect(() => {
        const web3modal = new Web3Modal();
        if (web3modal.cachedProvider) {
            console.log("IN CACHED")

            connectWallet();
        }

        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
                console.log('MetaMask is locked');
                setAddress(null);
            } else {
                console.log("IN ELSE")
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

    async function getPublicKey() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Yêu cầu kết nối với Metamask
            const signer = provider.getSigner();

            // Nhập địa chỉ ví bạn muốn lấy public key
            const address = await signer.getAddress();

            // Tạo một thông điệp ngẫu nhiên để ký
            const message = "Lấy public key từ chữ ký của thông điệp này.";
            const signature = await signer.signMessage(message);

            // Từ chữ ký, lấy ra public key
            const publicKey = ethers.utils.recoverPublicKey(ethers.utils.hashMessage(message), signature);
            return (publicKey)
        } catch (err) {
            console.log(err)
        }
        // Kết nối với Metamask thông qua Web3Provider

    }




    const contextValue = { provider, contract, signer, loading, address, connectWallet, getPublicKey };
    return (
        <SignerContext.Provider value={contextValue}>
            {children}
        </SignerContext.Provider>
    );
};

export default useSigner;
