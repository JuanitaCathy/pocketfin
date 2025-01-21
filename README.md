# PocFin - Finance App

Welcome to **PocFin**, a financial management app that helps you track your income, expenses, and savings. It also features a goal tracker, transaction log.
It's powered by Langraph agent for user interaction by copilotkit coagents!

## Features

- **Income & Expense Tracker**: Track your income and expenses with ease. Visualize your balance and track your progress towards savings.
- **Goal Tracker**: Set financial goals and monitor your progress towards achieving them. Once the goal is reached, confetti will celebrate your achievement.
- **Transaction Log**: Keep a log of all your financial transactions, including income and expenses.

## Tech Stack

- **NextJS**: Frontend framework for building interactive UIs.
- **TypeScript**: Ensures type safe code
- **Tailwind CSS**: For responsive, utility-first styling.
- **CopilotKit**: Used to integrate the chatbot functionality.
- **Canvas Confetti**: To trigger confetti once a financial goal is reached.
- **Lucide Icons**: Provides SVG icons for the UI.

## Demo



## Getting Started

To get started with the project, follow the steps below:

### Prerequisites

- Node.js (>= 14.0.0)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JuanitaCathy/purrse.git
   ```

2. install the dependencies:

```sh
cd agent
poetry install
```

Then, create a `.env` file inside `./agent` with the following:

```
GROQ_API_KEY=...
```

Then, run the demo:

```sh
poetry run demo
```

## Running the UI

1. Install the dependencies:

```sh
cd ./ui
pnpm i
```

Then, create a `.env` file inside `./ui` with the following:

```
GROQ_API_KEY=...
```

Then, run the Next.js project:

```sh
pnpm run dev
```

## Usage

Navigate to [http://localhost:3000](http://localhost:3000).


# Troubleshooting

A few things to try if you are running into trouble:

1. Make sure there is no other local application server running on the 8000 port.
2. Under `/agent/my_agent/demo.py`, change `0.0.0.0` to `127.0.0.1` or to `localhost`
