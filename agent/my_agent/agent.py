"""
This is the main entry point for the AI financial assistant.
It defines the workflow graph and the entry point for the agent.
"""
# pylint: disable=line-too-long, unused-import

from typing import TypedDict, Annotated
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph.message import add_messages


class FinancialAssistantState(TypedDict):
    """Contains the state of the financial assistant agent."""
    messages: Annotated[list, add_messages]


# Initialize the LLM
llm = ChatGroq(model="llama-3.3-70b-versatile")


# Financial assistant prompt
financial_prompt = """
You are a financial assistant specialized in helping broke students. You provide personalized advice for:
1. Creating a simple budget based on their income and expenses.
2. Recommending money-saving tips and resources like student discounts or apps.
3. Offering suggestions to optimize spending on essentials.
4. Giving actionable steps to start saving even on a tight budget.

When asked, respond clearly and concisely with practical steps the user can take.
"""


def financial_assistant(state: FinancialAssistantState):
    """
    Enhances the AI's response by appending the financial assistant prompt.
    """
    user_messages = state["messages"]
    full_prompt = f"{financial_prompt}\nUser Query: {user_messages[-1].content}\nResponse:"
    response = llm.invoke(full_prompt)
    return {"messages": user_messages + [response]}


# Define the workflow
workflow = StateGraph(FinancialAssistantState)
workflow.add_node("financial_assistant", financial_assistant)
workflow.set_entry_point("financial_assistant")
workflow.add_edge("financial_assistant", END)

# Compile the workflow with memory checkpointing
memory = MemorySaver()
graph = workflow.compile(checkpointer=memory)
