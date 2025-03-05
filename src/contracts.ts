const FACTORY_CONTRACT_ADDRESS = "0x3b4F8ACD91f16281e9988d2086D7fA4D036d04C3"
const RAFFLE_CONTRACT_ADDRESS = "0xE5bc35a61D0e2445496EE17380b76adF866F3Cdd"
const FACTORY_CONTRACT_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"raffleAddress","type":"address"},{"indexed":false,"internalType":"address","name":"creator","type":"address"}],"name":"RaffleCreated","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allRaffles","outputs":[{"internalType":"contract NFTRaffle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allRafflesArray","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_entryCost","type":"uint256"},{"internalType":"uint256","name":"_maxEntries","type":"uint256"}],"name":"createRaffle","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllActiveRaffles","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"getUserActiveRaffles","outputs":[{"components":[{"internalType":"address","name":"raffleAddress","type":"address"},{"internalType":"uint256","name":"entryCost","type":"uint256"},{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct NFTRaffleFactory.raffleDetails[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"getUserCompletedRaffles","outputs":[{"components":[{"internalType":"address","name":"raffleAddress","type":"address"},{"internalType":"uint256","name":"entryCost","type":"uint256"},{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct NFTRaffleFactory.raffleDetails[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]
const RAFFLE_CONTRACT_ABI = [{"inputs":[{"internalType":"uint256","name":"_entryCost","type":"uint256"},{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_maxEntries","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BalanceWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCost","type":"uint256"}],"name":"EntryCostChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"NFTPrizeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"player","type":"address"}],"name":"NewEntry","type":"event"},{"anonymous":false,"inputs":[],"name":"RaffleCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"RaffleEnded","type":"event"},{"anonymous":false,"inputs":[],"name":"RaffleStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"}],"name":"WinnerSelected","type":"event"},{"inputs":[{"internalType":"uint256","name":"_numberOfEntries","type":"uint256"}],"name":"buyEntry","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"cancelRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newEntryCost","type":"uint256"}],"name":"changeEntryCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"entryCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"entryCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayer","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_player","type":"address"}],"name":"isPlayer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxEntries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_nftAddress","type":"address"},{"internalType":"uint256","name":"_nftId","type":"uint256"}],"name":"raffleStarted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"raffleStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"selectWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalEntries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
]
const PRICE_FEED_ADDRESS = "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7"
export { FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI, RAFFLE_CONTRACT_ABI, aggregatorV3InterfaceABI, PRICE_FEED_ADDRESS }