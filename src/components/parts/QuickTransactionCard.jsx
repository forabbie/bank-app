import { useState } from "react";
import SendMoneyModal from "../modals/SendMoneyModal";

/* eslint-disable react/prop-types */
const QuickTransactionCard = (props) => {
  const [open, setOpen] = useState(false);
  const { user, users, setUsers, transactions, setTransactions } = props;
  const transactedFrom = transactions.filter(
    (transaction) =>
      transaction.transact_from === user.user_id &&
      transaction.transact_to != user.user_id
  );
  const groupedTransactedPeople = Object.values(
    transactedFrom.reduce((acc, transaction) => {
      const { transact_to: transactToUserId } = transaction;
      const transactToUser = users.find(
        (_user) => _user.user_id === transactToUserId
      );

      if (!acc[transactToUserId]) {
        acc[transactToUserId] = {
          ...transactToUser,
          transactions: [],
        };
      }

      acc[transactToUserId].transactions.push(transaction);
      return acc;
    }, {})
  );

  const handleToggle = () => {
    // console.log(value);
    setOpen((prev) => !prev);
  };

  const people = groupedTransactedPeople;
  return (
    <>
      <div className="col-start-2 col-span-2">
        <div className="card bg-slate-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title capitalize">Quick transfer</h2>
            <div className="flex space-x-6 overflow-x-scroll  mt-5">
              <div className="">
                <button
                  onClick={handleToggle}
                  className="btn bg-primary border-0 h-14 w-14 rounded-full text-xl text-primary-content hover:text-primary"
                >
                  +
                </button>
                <p className="mt-2">Transfer</p>
                <small className="text-slate-500">Manual</small>
              </div>
              {people.map((person, index) => (
                <div key={index}>
                  <img
                    className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
                    src={person.imageUrl}
                    alt={"img" + person.account.wallet_id}
                  />
                  <p className="mt-2">{person.fname}</p>
                  <small className="text-slate-500">
                    {person.account.wallet_id}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SendMoneyModal
        user={user}
        open={open}
        users={users}
        setUsers={setUsers}
        transactions={transactions}
        setTransactions={setTransactions}
        onClick={handleToggle}
      />
    </>
  );
};

export default QuickTransactionCard;
