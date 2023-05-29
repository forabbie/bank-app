/* eslint-disable react/prop-types */
import { useState } from "react";
import BalanceModal from "../modals/BalanceModal";

const BalanceCard = (props) => {
  const { user, users, setUsers, transactions, setTransactions } = props;
  const [open, setOpen] = useState({
    state: false,
    key: "",
  });

  const userInfo = user;
  const handleToggle = (value = "") => {
    // console.log(value);
    setOpen((prev) => ({
      state: !prev.state,
      key: value,
    }));
  };

  return (
    <>
      <div className="col-start-1 col-span-1">
        <div className="card bg-slate-100 shadow-xl">
          <div className="card-body text-start">
            <div className="card-actions justify-between">
              <h2 className="card-title">Balance</h2>
              <button
                onClick={() => handleToggle("withdraw")}
                className="btn-link text-info no-underline hover:no-underline hover:text-primary"
              >
                Withdraw
              </button>
            </div>
            <p className="text-ellipsis overflow-hidden text-5xl mt-5">
              {user.account.balance.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <div className="-mt-2">
              <small className="capitalize">
                wallet ID: {userInfo.account.wallet_id}
              </small>
              <button
                onClick={() => handleToggle("deposit")}
                className="btn btn-sm btn-block mt-2 bg-primary border-0 text-primary-content hover:bg-primary-focus hover:text-base-100"
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <BalanceModal
        user={user}
        open={open}
        users={users}
        setUsers={setUsers}
        transactions={transactions}
        setTransactions={setTransactions}
        onClick={() => handleToggle()}
      />
    </>
  );
};

export default BalanceCard;
