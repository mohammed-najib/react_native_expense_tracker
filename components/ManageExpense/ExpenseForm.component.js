import { View } from "react-native";
import Input from "./Input.component";

const ExpenseForm = () => {
    const amountChangedHandler = () => {
        // 
    }

  return (
    <View>
      <Input label="Amount" textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: amountChangedHandler,
      }} />
      <Input label="Date" textInputConfig={{
        placeHolder: 'YYYY-MM-DD',
        maxLength: 10,
        onChangeText: () => {},
      }} />
      <Input label="Description" textInputConfig={{
        multiline: true,
        onChangeText: () => {},
      }} />
    </View>
  );
};

export default ExpenseForm;
