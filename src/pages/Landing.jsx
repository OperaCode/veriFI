import React,{useState} from "react";
import { motion } from "framer-motion";
import { AlignJustify } from "lucide-react";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md py-4 px-6 shadow-lg border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            <span>🛡️</span>VeriFI
          </h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="/"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-400 focus:outline-none"
            >
              <AlignJustify/>
            </button>
          </div>
        </div>

        {/* Mobile nav links */}
        {isOpen && (
          <div className="md:hidden mt-2 px-2 space-y-2 mx-auto">
            <a href="/" className="block text-gray-300 hover:text-blue-400">
              Home
            </a>
            <a
              href="#features"
              className="block text-gray-300 hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-300 hover:text-blue-400"
            >
              How It Works
            </a>
            <a href="#faq" className="block text-gray-300 hover:text-blue-400">
              FAQ
            </a>
          </div>
        )}
      </header>
      
      Ì{/* Hero */}
      <section
        id="top"
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-24 text-center relative overflow-hidden"
      >
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Track Your ETH with VeriFI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Resolve Ethereum transactions to ENS names in a decentralized,
            secure way.
          </p>
          <a href="/home">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-white font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Explore VeriFI
            </button>
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-800/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Why VeriFI Stands Out
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Transaction Explorer",
              desc: "View all incoming ETH transactions with real-time blockchain data.",
              icon: "💸",
            },
            {
              title: "ENS Resolver",
              desc: "Automatically map sender addresses to human-readable ENS names.",
              icon: "🌐",
            },
            {
              title: "Decentralized & Secure",
              desc: "No wallet connection. Powered by public blockchain data for trustless security.",
              icon: "🔗",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 p-6 rounded-lg shadow-md hover:shadow-xl border border-blue-800/50 hover:border-blue-600 transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-blue-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          How VeriFI Works
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            "Input your Ethereum wallet address.",
            "Click 'Check' to query the blockchain.",
            "See transactions with ENS names instantly.",
          ].map((step, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-4 text-left"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-lg text-gray-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "Do I need to connect my wallet?",
              answer:
                "No, VeriFI uses public blockchain data, ensuring no wallet connection is needed.",
            },
            {
              question: "What is ENS?",
              answer:
                "Ethereum Name Service (ENS) maps Ethereum addresses to readable names.",
            },
            {
              question: "How secure is VeriFI?",
              answer:
                "Completely secure. We only access public blockchain data and store no personal info.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
              className="border-b border-blue-800/50 pb-4"
            >
              <h3 className="text-lg font-semibold text-gray-200">
                {faq.question}
              </h3>
              <p className="text-gray-400 mt-2">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center border-t border-blue-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400">
            Built by{" "}
            <a
              href="https://github.com/OperaCode"
              className="underline hover:text-blue-400"
            >
              Opera
            </a>{" "}
            | Powered by ethers.js & Etherscan API
          </p>
          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} VeriFI. Decentralized & Transparent.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
