import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm.component";
import ErrorOverlay from "../components/ui/ErrorOverlay.component";
import IconButton from "../components/ui/IconButton.component";
import LoadingOverlay from "../components/ui/LoadingOverlay.component";
import { GlobalStyles } from "../constants/styles.constant";
import { ExpensesContext } from "../store/expenses.context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http.util";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      expensesCtx.deleteExpense(editedExpenseId);
      await deleteExpense(editedExpenseId);
    } catch (error) {
      setError("Could not delete expense - please try again later!");
    }
    setIsSubmitting(false);

    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      setIsSubmitting(true);
      try {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } catch (error) {
        setError("Could not edit expense - please try again later!");
      }
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
      try {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      } catch (error) {
        setError("Could not add expense - please try again later!");
      }
      setIsSubmitting(false);
    }

    navigation.goBack();
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
