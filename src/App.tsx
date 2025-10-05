import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useWriteContract } from "wagmi";
import { counterAbi } from "./abi/counter";
import Transactions from "./components/Transactions";

import SendEth from "./components/SendEth.tsx";
import WalletCard from "./components/WalletCard.tsx";

export default function App() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    // const { data: bal } = useBalance({ address, query: { enabled: !!address } });
    const { writeContract, isPending } = useWriteContract();
    const isSepolia = chainId === 11155111;

    // const short = (s?: string) => (s ? `${s.slice(0,6)}...${s.slice(-4)}` : "");

    const makeTestTx = () => {
        const addr = import.meta.env.VITE_COUNTER_ADDRESS as `0x${string}`;
        if (!addr) return alert("Set VITE_COUNTER_ADDRESS");
        writeContract({ address: addr, abi: counterAbi, functionName: "increment" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-100">

        {/* Hero */}
            <header className="py-16 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-3">Simple Web3 App</h1>
                <p className="text-gray-600 mb-6">Solidity · Hardhat 3 (Viem) · React · Tailwind · Sepolia</p>
                <div className="flex items-center justify-center">
                    <ConnectButton />
                </div>
                {isConnected && !isSepolia && <p className="text-red-600 mt-3">Switch network to Sepolia.</p>}
            </header>

            {/* Wallet card */}
            <main className="max-w-4xl mx-auto px-4 space-y-8 pb-16">
                <section>

                    <WalletCard />
                    {/* (opcjonalnie) przycisk pod kartą */}
                    <div className="mt-4">
                        <button
                            onClick={makeTestTx}
                            disabled={!isSepolia || !isConnected || isPending}
                            className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-tr shadow-2xl from-yellow-600/20 to-green-500/50 cursor-pointer text-white disabled:opacity-50"
                        >
                            {isPending ? "Sending…" : "Make test tx"}
                        </button>
                    </div>
                </section>
                <SendEth />

                {/* Transactions */}
                <section className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-lg shadow-black/20">
                    <h2 className="text-xl text-white font-semibold mb-4">Recent Transactions</h2>
                    <Transactions address={address as any} />
                </section>
            </main>
        </div>
    );
}
