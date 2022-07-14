import React, { useState } from "react";

export const ListCard = ({ data, action }) => {
  const [price, setPrice] = useState();

  return (
    <>
      <div class="column">
        <div class="card">
          <h3>Token id #{data?.token_id}</h3>
          <p>Some text</p>
          <p>Some text</p>
          <label>Enter Price:</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
          <button onClick={() => action(data?.token_id, price)}>
            List NFt
          </button>
        </div>
      </div>
    </>
  );
};
