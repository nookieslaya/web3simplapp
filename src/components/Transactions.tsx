import { useEffect, useState } from "react";

type Tx = { hash: string; value: string; timeStamp: number };

export default function Transactions({ address }: { address?: `0x${string}` }) {
    const [txs, setTxs] = useState<Tx[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) return;
        (async () => {
            setLoading(true);
            try {
                const url = new URL("https://api-sepolia.etherscan.io/api");
                url.searchParams.set("module","account");
                url.searchParams.set("action","txlist");
                url.searchParams.set("address", address);
                url.searchParams.set("startblock","0");
                url.searchParams.set("endblock","99999999");
                url.searchParams.set("sort","desc");
                url.searchParams.set("apikey", import.meta.env.VITE_ETHERSCAN_API_KEY);
                const res = await fetch(url.toString());
                const data = await res.json();
                const arr = (data.result ?? []).slice(0,10).map((t: any) => ({
                    hash: t.hash,
                    value: (Number(t.value) / 1e18).toString(),
                    timeStamp: Number(t.timeStamp),
                }));
                setTxs(arr);
            } finally { setLoading(false); }
        })();
    }, [address]);

    if (!address) return <p className="text-gray-600">Connect wallet to load txs.</p>;
    if (loading) return <p>Loading…</p>;
    if (txs.length === 0) return <p>No transactions found.</p>;

    const short = (s: string) => `${s.slice(0,6)}...${s.slice(-4)}`;

    return (
        <ul className="divide-y divide-white/10">
            {txs.map(t => (
                <li key={t.hash} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 hover:bg-white/5 rounded-lg px-2 transition">
                    <a
                        className="font-mono underline text-cyan-400 hover:text-cyan-300"
                        href={`https://sepolia.etherscan.io/tx/${t.hash}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {short(t.hash)}
                    </a>
                    <div className="text-sm text-gray-300">
                        <span className="mr-4">{t.value} ETH</span>
                        <span>{new Date(t.timeStamp * 1000).toLocaleString()}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}
