// import { users, transactions } from "../constants/users";
import { useState } from "react";
import { getSessionStorage } from "../services/storage.service";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickTransactionCard from "../components/parts/QuickTransactionCard";
import BalanceCard from "../components/parts/BalanceCard";
import RecentTransaction from "../components/parts/RecentTransaction";

const Dashboard = () => {
  const title = "Dashboard";
  const userLoggedIn = getSessionStorage("loggedInUser", true) || {
    isLoggedin: true,
    email: "lexi@email.com",
  };
  const [users, setUsers] = useState(() => {
    const storedUsers = getSessionStorage("users");
    return storedUsers || users;
  });

  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = getSessionStorage("transactions");
    return storedTransactions || transactions;
  });
  const user = users.find((user) => user.email === userLoggedIn.email);

  return (
    <>
      <Navbar user={user} />
      <Header title={title} />
      <main>
        <div className="container mx-auto max-w-7xl sm:px-5 lg:px-10 py-6">
          <div className="grid grid-flow-col grid-cols-3 gap-8 text-[#1d252a]">
            <BalanceCard
              user={user}
              users={users}
              setUsers={setUsers}
              transactions={transactions}
              setTransactions={setTransactions}
            />
            <QuickTransactionCard
              user={user}
              users={users}
              setUsers={setUsers}
              transactions={transactions}
              setTransactions={setTransactions}
            />
            <RecentTransaction
              user={user}
              users={users}
              transactions={transactions}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
