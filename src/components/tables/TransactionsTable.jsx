import { formatDate, formatCurrency } from "../../services/utils";

const TransactionTable = (props) => {
  const { recentTransaction } = props;

  // const formattedAmount = person.transaction.amount.toLocaleString("en-PH", {
  //   style: "currency",
  //   currency: "PHP",
  // });

  return (
    <>
      <table className="table w-full rounded-none">
        <thead className="">
          <tr className="text-white">
            <th className="rounded-none bg-blue-900">Name</th>
            <th className="bg-blue-900">Amount</th>
            <th className="bg-blue-900">Type</th>
            <th className="rounded-none bg-blue-900">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentTransaction.map((person, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={person.user.imageUrl}
                        alt={
                          "resent-transaction-img-" +
                          person.user.account.wallet_id
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {person.user.fname + " " + person.user.lname}
                    </div>
                    <div className="text-sm opacity-50">
                      Wallet ID: {person.user.account.wallet_id}
                    </div>
                  </div>
                </div>
              </td>
              <td>{formatCurrency(person.transaction.amount)}</td>
              <td>{person.transaction.type || "-"}</td>
              <th>{formatDate(person.transaction.date)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TransactionTable;
