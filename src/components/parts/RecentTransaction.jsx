/* eslint-disable react/prop-types */

import TransactionTable from "../tables/TransactionsTable";

const RecentTransaction = (props) => {
  const { user, users, transactions } = props;

  const recentTransaction = transactions
    .filter((transaction) => transaction.transact_from === user.user_id)
    .map((transaction) => {
      const transactToUser = users.find(
        (u) => u.user_id === transaction.transact_to
      );
      return {
        transaction,
        user: transactToUser,
      };
    })
    .sort((a, b) => new Date(b.transaction.date) - new Date(a.transaction.date))
    .splice(0, 5);

  return (
    <>
      <div className=" col-start-1 col-span-3">
        <div className="card w-100 bg-slate-100 shadow-xl">
          <div className="card-body px-0 pb-0">
            <h2 className="card-title ms-6 mb-5">Recent transaction</h2>
            <div className="overflow-x-auto w-full">
              <TransactionTable recentTransaction={recentTransaction} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecentTransaction;
