/* eslint-disable react/prop-types */
import { useState } from "react";
import WithdrawModal from "../modals/WithdrawModal";
import DepositModal from "../modals/DepositModal";

const BalanceCard = (props) => {
  const { user, users, setUsers, transactions, setTransactions } = props;
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);

  // const formattedAmount = user.account.balance.toLocaleString("en-PH", {
  //   style: "currency",
  //   currency: "PHP",
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });

  const userInfo = user;

  const handleWithdrawToggle = () => setWithdrawOpen((prev) => !prev);
  const handleDepositToggle = () => setDepositOpen((prev) => !prev);

  return (
    <>
      <div className="col-start-1 col-span-1">
        <div className="card bg-slate-100 shadow-xl">
          <div className="card-body text-start">
            <div className="card-actions justify-between">
              <h2 className="card-title">Balance</h2>
              <button
                onClick={handleWithdrawToggle}
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
                onClick={handleDepositToggle}
                className="btn btn-sm btn-block mt-2 bg-primary border-0 text-primary-content hover:bg-primary-focus hover:text-base-100"
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <WithdrawModal
        user={user}
        open={withdrawOpen}
        users={users}
        setUsers={setUsers}
        transactions={transactions}
        setTransactions={setTransactions}
        onClick={handleWithdrawToggle}
      />
      <DepositModal
        user={user}
        open={depositOpen}
        users={users}
        setUsers={setUsers}
        transactions={transactions}
        setTransactions={setTransactions}
        onClick={handleDepositToggle}
      />
    </>
  );
};

export default BalanceCard;
