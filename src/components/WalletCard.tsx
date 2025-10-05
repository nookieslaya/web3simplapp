import { useMemo } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";

function maskAddress(addr?: string) {
    if (!addr) return "— — — —   — — — —   — — — —   — — — —";
    return `${addr.slice(0, 6)}  • • • •   • • • •   ${addr.slice(-4)}`;
}

export default function WalletCard() {
    const { address, isConnected } = useAccount();
    const { data: bal } = useBalance({ address, query: { enabled: !!address } });
    const chainId = useChainId();
    const isSepolia = chainId === 11155111;

    // const [copied, setCopied] = useState(false);
    const shortChain = useMemo(() => (isSepolia ? "SEPOLIA" : `CHAIN ${chainId || "?"}`), [isSepolia, chainId]);

    // const onCopy = async () => {
    //     if (!address) return;
    //     await navigator.clipboard.writeText(address);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 1200);
    // };

    return (
        <div className="relative w-full max-w-xl h-auto mx-auto">
            {/* połysk */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-60 [mask-image:radial-gradient(150px_60px_at_20%_0%,black,transparent)]">
                <div className="absolute -top-6 -left-8 md:h-60 h-40 w-64 rotate-12 bg-white/20 blur-2xl" />
            </div>

            <div
                className="
          relative rounded-3xl p-6 h-65 md:h-64
          bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1020]
          border border-white/15 text-gray-100 overflow-hidden
          shadow-2xl shadow-black/30
        "
            >
                {/* pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_120%,rgba(34,211,238,0.2),transparent_35%)]" />
                </div>

                {/* górny pasek */}
                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 417"
                            className="h-8 w-8 drop-shadow-[0_0_10px_rgba(147,197,253,0.3)]"
                        >
                            <path
                                fill="#8A92B2"
                                d="M127.6 0l-3 10.2v270.3l3 3 127.6-75.2z"
                            />
                            <path
                                fill="#62688F"
                                d="M127.6 0L0 208.3l127.6 75.2V154.9z"
                            />
                            <path
                                fill="#8A92B2"
                                d="M127.6 312.7l-1.7 2.1v101.3l1.7 4.9 127.7-180.2z"
                            />
                            <path
                                fill="#62688F"
                                d="M127.6 420.9V312.7L0 238.8z"
                            />
                            <path
                                fill="#454A75"
                                d="M127.6 283.5l127.6-75.2-127.6-53.4z"
                            />
                            <path
                                fill="#62688F"
                                d="M0 208.3l127.6 75.2v-128.6z"
                            />
                        </svg>

                        <span className="text-xs uppercase tracking-widest text-white/70">Ethereum</span>
                    </div>

                    <div className="text-right">
                        <div className="text-xs tracking-widest text-white/70">NETWORK</div>
                        <div className="font-semibold">{shortChain}</div>
                    </div>
                </div>

                {/* numer "karty" (adres) */}
                <div className="relative z-10 mt-4 md:mt-8 ">
                    <div className="text-xs tracking-wide text-white/60 mb-1">WALLET</div>
                    <div className="font-mono md:text-2xl tracking-[0.2em] text-lg">
                        {maskAddress(address)}
                    </div>
                </div>

                {/* dół karty */}
                <div className="relative z-10 mt-4 md:mt-6 flex items-end justify-between">
                    <div>
                        <div className="text-[10px] tracking-widest text-white/60">HOLDER</div>
                        <div className="text-sm font-medium">{isConnected ? "CONNECTED" : "—"}</div>
                    </div>

                    <div className="text-right">
                        <div className="text-[10px] tracking-widest text-white/60">BALANCE</div>
                        <div className="text-lg font-semibold">{bal?.formatted ?? "0"} ETH</div>
                    </div>
                </div>

                {/* przyciski akcji */}
                {/*<div className="absolute bottom-4 left-6 right-6 flex items-center justify-between mt-4">*/}
                {/*    <button*/}
                {/*        onClick={onCopy}*/}
                {/*        className="px-3  mt-4py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-xs backdrop-blur transition"*/}
                {/*    >*/}
                {/*        {copied ? "Copied!" : "Copy address"}*/}
                {/*    </button>*/}

                {/*    <div className="flex items-center gap-2 ">*/}
                {/*        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-90" />*/}
                {/*        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 opacity-90 -ml-2" />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
