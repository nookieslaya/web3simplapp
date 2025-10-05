export const counterAbi = [
    { type:"function", name:"count", stateMutability:"view", inputs:[], outputs:[{type:"uint256"}] },
    { type:"function", name:"increment", stateMutability:"nonpayable", inputs:[], outputs:[] }
] as const;
