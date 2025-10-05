import { useState } from "react";
import { useAccount, useChainId, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export default function SendEth() {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const isSepolia = chainId === 11155111;

    const [to, setTo] = useState<`0x${string}` | "">("");
    const [amount, setAmount] = useState<string>("");

    const { sendTransaction, data: txHash, isPending, error } = useSendTransaction();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected) return alert("Connect wallet first.");
        if (!isSepolia) return alert("Switch to Sepolia.");
        try {
            if (!to || !to.startsWith("0x") || to.length !== 42) {
                return alert("Enter a valid recipient address (0x..., 42 chars).");
            }
            const value = parseEther(amount || "0");
            if (value <= 0n) return alert("Amount must be > 0.");
            sendTransaction({ to, value });
        } catch (err: any) {
            alert(err?.message ?? "Invalid amount.");
        }
    };

    const short = (s: string) => `${s.slice(0,6)}...${s.slice(-4)}`;

    return (
        <section className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-lg shadow-black/20">
            <h2 className="text-xl font-semibold mb-4">Send ETH (Sepolia)</h2>
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                    <label className="block text-sm text-gray-500 mb-1">Recipient (0x…)</label>
                    <input
                        value={to}
                        onChange={(e) => setTo(e.target.value as any)}
                        placeholder="0xRecipientAddress"
                        className="w-full border rounded-lg px-3 py-2 font-mono"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Amount (ETH)</label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.01"
                        inputMode="decimal"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div className="md:col-span-3">
                    <button
                        type="submit"
                        disabled={!isConnected || !isSepolia || isPending}
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-50 cursor-pointer"
                    >
                        {isPending ? "Sending…" : "Send ETH"}
                    </button>
                </div>
            </form>

            {/* Status */}
            <div className="mt-3 text-sm">
                {txHash && (
                    <a
                        href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline font-mono"
                    >
                        View tx: {short(txHash)}
                    </a>
                )}
                {error && <p className="text-red-600 mt-2">{(error as any)?.shortMessage || error.message}</p>}
            </div>
        </section>
    );
}
