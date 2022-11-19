import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.component";
import { ExpensesContext } from "../store/expenses.context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallBackTxt="No registered expenses found!"
    />
  );
};

export default AllExpenses;
