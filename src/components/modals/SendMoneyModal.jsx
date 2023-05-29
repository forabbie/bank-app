import Modal from "./Modal";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { useState } from "react";
import { setDateTime, formatCurrency } from "../../services/utils";
import { setSessionStorage } from "../../services/storage.service";

/* eslint-disable react/prop-types */
const SendMoneyModal = (props) => {
  const {
    open,
    user,
    users,
    setUsers,
    transactions,
    setTransactions,
    onClick,
  } = props;
  const [amount, setAmount] = useState("");
  const [toUser, setToUser] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputClass = [
    "input input-bordered w-full",
    hasError ? "input-error" : "",
  ].join(" ");

  const messageClass = ["text-error text-start", hasError ? "" : "hidden"].join(
    " "
  );

  const [toUserHasError, setToUserHasError] = useState(false);
  const [toUserErrorMessage, setToUserErrorMessage] = useState("");
  const toUserMessageClass = [
    "text-error text-start",
    toUserHasError ? "" : "hidden",
  ].join(" ");
  const toUserInputClass = [
    "select select-bordered w-full",
    toUserHasError ? "input-error" : "",
  ].join(" ");

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
  const onToUserChange = (e) => {
    const value = e.target.value;
    setToUser(parseInt(value));
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
    if (user.account.balance <= formattedAmount) {
      setHasError(true);
      setErrorMessage("You don't have enough balance");
      return;
    }
    const transaction = {
      transaction_id: transactions.length + 1,
      amount: formattedAmount,
      transact_to: toUser,
      transact_from: user.user_id,
      type: "transfer",
      date: setDateTime(),
    };
    setHasError(false);
    const updatedTransactions = [...transactions, transaction];
    const totalBalance = user.account.balance - formattedAmount;
    const toUserTotalBalance = user.account.balance + formattedAmount;
    setSessionStorage("transactions", updatedTransactions, false);
    setTransactions(updatedTransactions);
    updateUserBalance(user.user_id, totalBalance);
    updateUserBalance(toUser, toUserTotalBalance);
    setAmount(0);
    onClick();
  };

  return (
    <Modal open={open}>
      <h3 className="font-bold text-lg text-start">
        Current Balance{" "}
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
              Transfer to:
            </label>
            <select
              className={toUserInputClass}
              value={toUser}
              onChange={onToUserChange}
              placeholder="ex: 01984327"
            >
              <option value={""}>Select user</option>
              {users.map((person, index) => (
                <option key={index} value={person.user_id}>
                  {person.fname}
                </option>
              ))}
            </select>
            <p className={toUserMessageClass}>{toUserErrorMessage}</p>
          </div>
          <div className="form-control w-full">
            <label
              htmlFor="withdraw-input"
              className="text-md text-start normal-case mb-3"
            >
              Enter the amount you want to transfer
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
            <Button type="submit" className="btn" label={"transfer"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default SendMoneyModal;
