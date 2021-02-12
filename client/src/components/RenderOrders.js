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
    const { profile } = props;

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



    const RenderOrder = (props) => {
        const {order} = props;

        return (
            <tr key={order.id}>
              <td>{order.donatedAmount}</td>
              <td title={`${order.description.substring(0, 60)}...`}>{order.description.substring(0, 25)}...</td>
              <td>{order.status === "0" ? "Not delivered" : "Delivered"}</td>
              <td>
                {
                <Link
                  className="table-button"
                  to={{
                    pathname: `/profile/${profile.id}/order/${order[0]}`,
                    state: {
                        order: order,
                        appState: props.appState
                    }
                  }}>
                  Handle Order
                </Link>
                }
              </td>
              <td>
                {
                  order.status === "1"
                  ?
                  <Link
                    className="table-button"
                    to={{
                      pathname: `/video/${order.id}`,
                      state: {
                          order: order
                      }
                    }}>
                    Order Link
                  </Link>
                  :
                  "Not available"
                }
              </td>
            </tr>
        )
    }


    return (
      <>
        <div className="orders-header">
          <h3 className="second-title">Orders</h3>
        </div>
        <table className="order-table">
            <thead>
              <tr>
                <>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Link</th>
                </>
            </tr>
          </thead>
          <tbody>
            {props.orders.map((row, i) => <RenderOrder order={row} key={i} />)}
          </tbody>
        </table>
      </>
    );
};

export default RenderOrders;
