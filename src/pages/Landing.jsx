import React from "react";

const Landing = () => {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Who Paid Me + ENS Lookup</h1>
        <p className="text-lg mb-6">
          Instantly see who sent you ETH – with readable ENS names.
        </p>
        <a href="/home">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold">
            Check My Wallet
          </button>
        </a>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">View Transactions</h3>
            <p>See all incoming ETH transactions to your address.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">ENS Lookup</h3>
            <p>Resolves sender addresses to ENS names automatically.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
            <p>
              No wallet connection required. Uses public blockchain data only.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 max-w-xl mx-auto text-left">
          <li>Enter your Ethereum wallet address.</li>
          <li>Click "Check".</li>
          <li>View transactions with ENS names and details instantly.</li>
        </ol>
      </section>


      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 text-white">
        <p>
          Built by{" "}
          <a href="https://github.com/OperaCode" className="underline">
            Opera
          </a>{" "}
          | Powered by ethers.js & Etherscan API
        </p>
      </footer>
    </div>
  );
};

export default Landing;
