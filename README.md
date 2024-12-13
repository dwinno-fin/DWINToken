# USDDWIN Smart Contract Repository

USDDWIN is a digital token designed to provide a secure, stable, and decentralized means of value exchange, leveraging blockchain technology for transparency and trust. This repository contains the source code for the USDDWIN token and associated smart contracts.

## Overview
USDDWIN represents a fiat-pegged cryptocurrency built on the Ethereum blockchain. Each USDDWIN token is backed by real-world assets at a 1:1 ratio, ensuring stability and security.

Key features:
- **Decentralized and Transparent:** Built on Ethereum with auditable reserves.
- **Stable Value:** Pegged 1:1 with USD.
- **Low Fees:** Minimal transaction costs compared to traditional systems.
- **Secure Transactions:** Cryptographically secure peer-to-peer exchanges.

## Smart Contract Features
The USDDWIN smart contracts include:
- **ERC-20 Token Compliance:** Ensures compatibility with the Ethereum ecosystem.
- **Proof of Reserves:** Verifies that every token is fully backed by fiat currency.
- **Mint and Burn Mechanisms:** Tokens are created or removed from circulation based on fiat reserves.
- **Transparency:** Reserves are audited and publicly reported on the blockchain.

## Key Benefits
- **Global Accessibility:** Enables rapid cross-border payments.
- **User-Friendly:** Simplified processes for non-technical users.
- **Enhanced Security:** Transactions are trustless, reducing counterparty risks.
- **Integration Ready:** Seamlessly integrates with wallets, exchanges, and merchants.

## Technology Stack
- **Blockchain Platform:** Ethereum
- **Token Standard:** ERC-20
- **Proof of Reserves System:** Audited by professional firms, with results published to the blockchain.
- **Wallet Compatibility:** Supports wallets such as MetaMask, Uniswap, and Binance.

## How It Works
1. **Issuance:** Fiat currency is deposited into a custodian account and an equivalent amount of USDDWIN tokens is minted.
2. **Transactions:** Tokens can be transferred, exchanged, or stored via wallets and exchanges.
3. **Redemption:** Tokens can be burned in exchange for fiat currency from the custodian account.

<!-- ## Flow Diagram
![Flow Diagram](path/to/flow-diagram.png) -->

## Getting Started
### Prerequisites
- Node.js and npm
- Hardhat

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/dwinno-fin/DWINToken
   ```
2. Navigate to the project directory:
   ```bash
   cd DWINToken
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

<!-- ### Deployment
1. Configure the Ethereum network in `hardhat.config.js`.
2. Deploy the contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network [network_name]
   ``` -->

### Testing
Run the tests using:
```bash
npx hardhat test
```

## Contributing
We welcome contributions to improve the USDDWIN project. Please follow the guidelines below:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and submit a pull request.

## License
This project is licensed under the Apache License Version 2.0.

<!-- ## Contact
For more information, visit our [website](https://usddwin.com) or reach out to our team at support@usddwin.com. -->
