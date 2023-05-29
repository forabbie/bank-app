import Modal from "./Modal";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { useState } from "react";
import { setSessionStorage } from "../../services/storage.service";

/* eslint-disable react/prop-types */
const WithdrawModal = (props) => {
  const { open, user, setUsers, transactions, setTransactions, onClick } =
    props;
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState("You don't have enough balance");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const inputClass = [
    "input input-bordered w-full",
    errorMessage ? "input-error" : "",
  ].join(" ");

  const messageClass = [
    "text-error text-start",
    errorMessage ? "" : "hidden",
  ].join(" ");

  const today = Date.now();
  const dateStamp = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);

  const onWithdrawAmountChange = (value) => {
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
    setWithdrawAmount(formattedValue);
  };
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
  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = parseFloat(withdrawAmount.replace(/[^0-9.]/g, ""));
    if (!formattedAmount) {
      setErrorMessage(true);
      setMessage("Cannot be empty");
      return;
    }
    if (formattedAmount < 300) {
      setErrorMessage(true);
      setMessage("Minimum of 300 are accepted");
      return;
    }
    if (user.account.balance <= formattedAmount) {
      setErrorMessage(true);
      return;
    }
    setErrorMessage(false);
    const transaction = {
      transaction_id: transactions.length + 1,
      amount: formattedAmount,
      transact_to: user.user_id,
      transact_from: user.user_id,
      type: "widthdraw",
      date: dateStamp,
    };
    const updatedTransactions = [...transactions, transaction];
    setSessionStorage("transactions", updatedTransactions, false);
    setTransactions(updatedTransactions);
    const totalBalance = user.account.balance - formattedAmount;
    updateUserBalance(user.user_id, totalBalance);
  };
  return (
    <Modal open={open}>
      <h3 className="font-bold text-lg text-start">
        Available Balance:{" "}
        <span className="text-info ">₱ {user.account.balance}</span>
      </h3>
      <div className="pt-4">
        <form onSubmit={handleWithdrawSubmit}>
          <div className="form-control w-full">
            <label htmlFor="withdraw-input" className="text-md text-start mb-3">
              Enter the amount you want to withdraw
            </label>
            <Input
              type="text"
              label={""}
              input={withdrawAmount}
              placeholder="00.00"
              className={inputClass}
              onChange={onWithdrawAmountChange}
            />
            <p className={messageClass}>{message}</p>
          </div>
          <div className="modal-action">
            <Button
              type="button"
              onClick={onClick}
              className="btn btn-outline"
              label={"Cancel"}
            />
            <Button type="submit" className="btn" label={"Withdraw"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default WithdrawModal;
