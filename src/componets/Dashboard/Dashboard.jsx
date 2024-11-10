import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Cards from "../Cards/Cards";
import Report from "../Report/Report";
import RecentSales from "../RecentSales/RecentSales";
import TopBidings from "../TopBidings/TopBidings";
import RecentTransactions from "../RecentTransactions/RecentTransactions";

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="dashboard section">
      
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {cards &&
              cards.length > 0 &&
              cards.map((card) => <Cards key={card._id} card={card} />)}

            <div className="col-12">
              <Report />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
            <div className="col-12">
              <TopBidings />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <RecentTransactions />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
