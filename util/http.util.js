import axios from "axios";

const BACKEND_RUL =
  "https://mohammed-najib-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_RUL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;

  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_RUL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(BACKEND_RUL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  return axios.delete(BACKEND_RUL + `/expenses/${id}.json`);
};
