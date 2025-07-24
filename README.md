🔎 VeriFi
Your Ethereum Transaction Resolver

VeriFi is a simple dApp that lets you:

✅ Enter any Ethereum wallet address

✅ View recent incoming transactions

✅ See token transfers (ERC20)

✅ Resolve addresses to their ENS names seamlessly



🛠️ Tech Stack
React ⚛️

Tailwind CSS 🌬️

ethers.js

Etherscan API

Alchemy RPC (for ENS resolution)

📸 Features
Search for any Ethereum wallet address

View:

Sender address

Amount in ETH

Timestamp (human-readable)

Transaction hash with Etherscan link

ENS resolution for addresses with a registered ENS

🔧 Setup
Clone the repo


git clone https://github.com/OperaCode/veriFI.git
cd verifi
Install dependencies


npm install
Create .env file


VITE_ETHERSCAN_API_KEY
VITE_RPC_URL
Run the app



⚠️ Notes
ENS lookups require an Ethereum RPC provider that supports ENS resolution (e.g. Alchemy, Infura).

Rate limits: Free Alchemy or Etherscan plans have request/compute limits. Optimize or upgrade for production use.


