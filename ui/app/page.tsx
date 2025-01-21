"use client";

import { useState } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Calculator, DollarSign, BarChart2, Target } from "lucide-react"; // Icons from Lucide
import { useEffect } from "react";
import confetti from "canvas-confetti"; // Confetti effect
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // States for Income, Expenses, Balance, and Transactions
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<string[]>([]); // Track transactions

  // Goal Tracking
  const [goal, setGoal] = useState(0); // Goal amount
  const [goalProgress, setGoalProgress] = useState(0); // Progress towards the goal

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleConfetti = () => {
    setShowConfetti(true);
    confetti(); // Trigger confetti
    setTimeout(() => setShowConfetti(false), 2000); // Stop confetti after 2 seconds
  };

  // Handle Income and Expense Calculation
  const calculateBalance = () => {
    setBalance(income - expenses);
    setGoalProgress(income); // Updating the goal progress based on income added
    if (income >= goal) {
      handleConfetti(); // Trigger confetti when goal is reached
    }
  };

  const handleAddTransaction = (type: "income" | "expense", amount: number) => {
    if (type === "income") {
      setIncome(income + amount);
    } else {
      setExpenses(expenses + amount);
    }

    // Add to transaction log
    setTransactions([...transactions, `${type === "income" ? "Income" : "Expense"}: $${amount}`]);
    calculateBalance();
  };

  return (
    <main className="h-screen w-full p-10 bg-black text-white" style={{
      "--copilot-kit-primary-color": "#FF66B2",  // Neon Pink
      "--copilot-kit-contrast-color": "#FFFFFF",
      "--copilot-kit-secondary-color": "#1A1A1A",  // Dark Background Color
      "--copilot-kit-secondary-contrast-color": "#E5E5E5", // Light Text
      "--copilot-kit-background-color": "#1A1A1A", // Dark Background Color
      "--copilot-kit-muted-color": "#B0B0B0", // Muted Text
      "--copilot-kit-separator-color": "#4B4B4B", // Divider Color
      "--copilot-kit-scrollbar-color": "#4B4B4B",
      "--copilot-kit-response-button-color": "#FF66B2", // Neon Pink for button
      "--copilot-kit-response-button-background-color": "#1A1A1A"
    } as CopilotKitCSSProperties}>
      <div className="flex flex-col items-center justify-start h-full">
        
        {/* Top Left: PURRSE Logo */}
        <div className="absolute top-10 left-10 text-4xl font-bold text-white">
          Purrse.
        </div>

        {/* Center: Welcome Back */}
        <div className="text-center my-12 font-semibold text-5xl">
          <p>Welcome back!</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end w-full pr-10 space-x-4 mb-10">
          <button onClick={() => handleAddTransaction("income", 100)} className="bg-pink-500 p-4 rounded-lg shadow-lg hover:bg-pink-600 hover:scale-105 transition-transform duration-300 opacity-80 hover:opacity-100">
            Add Income Transaction
          </button>
          <button onClick={() => handleAddTransaction("expense", 50)} className="bg-purple-500 p-4 rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-300 opacity-80 hover:opacity-100">
            Add Expense Transaction
          </button>
        </div>

        {/* Cards: Income, Expense, Savings (Horizontal, with gap) */}
        <div className="flex justify-between w-full max-w-screen-xl mb-12 gap-8">
          <div className="p-8 border-2 border-pink-500 rounded-xl bg-gray-800 shadow-xl hover:scale-105 transition-transform duration-300 w-1/3">
            <div className="flex items-center mb-4">
              <DollarSign size={24} className="mr-2 text-pink-500" />
              <h3 className="text-2xl font-semibold">Income</h3>
            </div>
            <p className="text-3xl font-bold">${income}</p>
          </div>
          <div className="p-8 border-2 border-purple-600 rounded-xl bg-gray-800 shadow-xl hover:scale-105 transition-transform duration-300 w-1/3">
            <div className="flex items-center mb-4">
              <DollarSign size={24} className="mr-2 text-purple-600" />
              <h3 className="text-2xl font-semibold">Expenses</h3>
            </div>
            <p className="text-3xl font-bold">${expenses}</p>
          </div>
          <div className="p-8 border-2 border-indigo-500 rounded-xl bg-gray-800 shadow-xl hover:scale-105 transition-transform duration-300 w-1/3">
            <div className="flex items-center mb-4">
              <BarChart2 size={24} className="mr-2 text-indigo-500" />
              <h3 className="text-2xl font-semibold">Savings</h3>
            </div>
            <p className="text-3xl font-bold">${balance}</p>
          </div>
        </div>

        {/* Goal Tracker and Transaction Log Side by Side */}
        <div className="flex justify-between w-full max-w-screen-xl gap-8 mb-12">
          {/* Goal Tracker */}
          <div className="flex items-center w-1/2">
            <div className="flex items-center space-x-4">
              <Target size={24} className="mr-2 text-yellow-500" />
              <h3 className="text-2xl font-semibold">Goal Tracker</h3>
            </div>
            <div className="w-3/4">
              <input
                type="number"
                className="p-3 rounded-lg w-full text-black mb-4"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                placeholder="Set your goal"
              />
              <progress className="w-full" value={goalProgress} max={goal} />
              <p className="mt-2 text-xl font-semibold text-yellow-500">
                ${goalProgress} / ${goal}
              </p>
            </div>
          </div>

          {/* Transaction Log */}
          <div className="w-1/2 p-8 border-2 border-pink-500 rounded-xl bg-gray-800 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Calculator size={24} className="mr-2 text-pink-500" />
              <h3 className="text-2xl font-semibold">Transaction Log</h3>
            </div>
            <div className="overflow-y-auto max-h-48">
              <ul className="space-y-2 text-lg">
                {transactions.length === 0 ? (
                  <li>No transactions yet.</li>
                ) : (
                  transactions.map((transaction, index) => (
                    <li key={index}>{transaction}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Message Icon for Chatbot */}
        <div onClick={toggleChat} className="fixed bottom-10 right-10 p-3 bg-pink-500 text-white rounded-full cursor-pointer">
          💬
        </div>

        {/* Chatbot Popup */}
        {chatOpen && (
          <div className="fixed bottom-0 right-0 w-1/4 h-full bg-gray-800 shadow-xl p-5 rounded-l-lg">
            <button 
              className="absolute top-2 right-2 text-white text-xl"
              onClick={toggleChat}
            >
              X
            </button>
            <CopilotKit runtimeUrl="/api/copilotkit" agent="purrse">
              <CopilotChat
                className="h-full w-full"
                labels={{
                  title: "purseey",
                  initial: "Hey broke student, what financial help do you need?",
                }}
              />
            </CopilotKit>
          </div>
        )}
      </div>
    </main>
  );
}
