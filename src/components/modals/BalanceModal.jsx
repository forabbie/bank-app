import Modal from "./Modal";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { useState } from "react";
import { setDateTime, formatCurrency } from "../../services/utils";
import { setSessionStorage } from "../../services/storage.service";

/* eslint-disable react/prop-types */
const BalanceModal = (props) => {
  const { open, user, setUsers, transactions, setTransactions, onClick } =
    props;
  const title =
    open.key === "withdraw" ? "Available Balance: " : "Current Balance: ";
  const [amount, setAmount] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputClass = [
    "input input-bordered w-full",
    hasError ? "input-error" : "",
  ].join(" ");

  const messageClass = ["text-error text-start", hasError ? "" : "hidden"].join(
    " "
  );

  const updateUserBalance = (userId, newBalance) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user.user_id === userId) {
          return {
            ...user,
            account: {
              ...user.account,
              balance: newBalance,
            },
          };
        }
        return user;
      });
      setSessionStorage("users", updatedUsers, false); // Update localStorage
      return updatedUsers;
    });
  };

  const onCancel = () => {
    setHasError(false);
    setAmount(0);
    onClick();
  };

  const onAmountChange = (value) => {
    // Remove non-numeric characters except for the dot (.)
    value = value.replace(/[^0-9.]/g, "");

    // Limit to 8 digits and 2 decimal places
    const regex = /^\d{0,5}(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      return; // Return early if the value doesn't match the pattern
    }

    // Split the value into integer and decimal parts
    const [integerPart, decimalPart] = value.split(".");

    // Format the integer part with commas
    let formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Build the formatted value with the decimal part
    let formattedValue = formattedIntegerPart;
    if (decimalPart !== undefined) {
      formattedValue += "." + decimalPart;
    }
    setAmount(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (!formattedAmount) {
      setHasError(true);
      setErrorMessage("Cannot be empty");
      return;
    }
    if (formattedAmount < 300) {
      setHasError(true);
      setErrorMessage("Please input a minimum amount of Php300");
      return;
    }
    if (formattedAmount > 99999) {
      setHasError(true);
      setErrorMessage("Maximum of Php99,999 is accepted");
      return;
    }
    if (open.key === "withdraw" && user.account.balance <= formattedAmount) {
      setHasError(true);
      setErrorMessage("You don't have enough balance");
      return;
    }
    const transaction = {
      transaction_id: transactions.length + 1,
      amount: formattedAmount,
      transact_to: user.user_id,
      transact_from: user.user_id,
      type: open.key,
      date: setDateTime(),
    };
    setHasError(false);
    const updatedTransactions = [...transactions, transaction];
    const totalBalance =
      open.key === "withdraw"
        ? user.account.balance - formattedAmount
        : user.account.balance + formattedAmount;
    setSessionStorage("transactions", updatedTransactions, false);
    setTransactions(updatedTransactions);
    updateUserBalance(user.user_id, totalBalance);
    setAmount(0);
    onClick();
  };

  return (
    <Modal open={open.state}>
      <h3 className="font-bold text-lg text-start">
        {title}
        <span className="text-info ">
          {formatCurrency(user.account.balance)}
        </span>
      </h3>
      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label
              htmlFor="withdraw-input"
              className="text-md text-start normal-case mb-3"
            >
              Enter the amount you want to {open.key}
            </label>
            <Input
              type="text"
              label={""}
              input={amount}
              placeholder="00.00"
              className={inputClass}
              onChange={onAmountChange}
            />
            <p className={messageClass}>{errorMessage}</p>
          </div>
          <div className="modal-action">
            <Button
              type="button"
              onClick={onCancel}
              className="btn btn-outline"
              label={"Cancel"}
            />
            <Button type="submit" className="btn" label={open.key} />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default BalanceModal;
