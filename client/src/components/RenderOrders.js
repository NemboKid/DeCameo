import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const RenderOrders = (props) => {
    // const extendMoment = lazy(() => import("moment-range"));
    const [orderView, setOrderView] = useState({
        active: true,
        history: false
    });

    const [renderedOrders, setRenderedOrders] = useState(false);
    const [count, setCount] = useState(0);
    var activeOrders = [];
    var historicOrders = [];

    const { id, profileName, keyName, price } = props;

    const handleToggle = (e) => {
        const { name, value } = e.target;

        setOrderView(prevValue => {
            if (name === "active") {
                return {
                    active: !prevValue.active
                };
            } else {
                return {
                    history: !prevValue.history
                };
            }
        });
        e.preventDefault();
    }


    const filterOrder = (order) => {
      let today = new Date();
      let isoDeadline = new Date(order.deadline);

      if (orderView.active && isoDeadline > today) {
          if (order.date_completed === null || order.date_completed === "") {
              if (!renderedOrders) {
                  setRenderedOrders(true);
              }
              return <RenderOrder key={uuidv4()} row={order}/>;
          }
      } else if (orderView.history) {
          if (isoDeadline < today || order.date_completed !== null) { //also show orders that are completed but not yet expired
              if (!renderedOrders) {
                  setRenderedOrders(true);
              }
              return <RenderOrder key={uuidv4()} row={order}/>;
          }
      }
    }


    const RenderOrder = (props) => {
        const {row} = props;

        return (
            <tr key={row.order_id}>
              <td>{row.occasion}</td>
              <td title={`${row.description.substring(0, 50)}...`}>{row.description.substring(0, 10)}...</td>
              <td style={{color: `${row.order_status !== "Delivered" ? "#697386" : ""}`}}>€{row.price}</td>
              <td>{row.order_status}</td>
              <td><span className={`table-row-box ${row.order_status !== "Delivered" ? "mark-red" : "mark-green"}`}/></td>
              <td>
                {
                <Link
                className="button-standard table-button"
                to={{
                  pathname: `/profile/${keyName}/handleorder/${row.order_id}`,
                  state: {
                      id: id,
                      keyName: keyName,
                      profileName: profileName,
                      order_id: row.order_id,
                      occasion: row.occasion,
                      description: row.description,
                      price: row.price,
                      order_to: row.order_to,
                      order_from: row.order_from,
                      payment_intent: row.payment_intent
                  }
                }}>Handle Order</Link>
                }
              </td>
            </tr>
        )
    }

    console.log(props.currentOrders);



    return (
      <>
        <div className="orders-header">
          <h3 className="second-title">Orders</h3>
          <div className="profile-navbar-bottom">
            <nav>
              <li><a href="#" className={`view-list-item ${orderView.active ? "view-list-active" : ""}`} name="active" onClick={handleToggle}>Ordini attivi</a></li>
              <li><a href="#" className={`view-list-item ${orderView.history ? "view-list-active" : ""}`} name="history" onClick={handleToggle}>Storia</a></li>
            </nav>
          </div>
        </div>
        <table className="order-table">
            <thead>
              <tr>
              {props.currentOrders ?
                  <>
                    <th>Occazione</th>
                    <th>Descrizione</th>
                    <th>Prezzo</th>
                    {orderView.active ? <th>Scadenza</th> : <th>Consegnato</th>}
                    <th>Stato</th>
                    <th>Azione</th>
                  </>
                :
                <>
                  <th></th>
                </>
              }
            </tr>
          </thead>
          <tbody>
            {/* {orderView.active ?  props.currentOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)).map(filterOrder) : null}
            {orderView.history ? props.currentOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)).map(filterOrder) : null} */}
          </tbody>
        </table>
      </>
    );
};

export default RenderOrders;
