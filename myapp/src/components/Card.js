import React from "react";

export default function Card(props) {

let options = props.options;
let priceOptions = Object.keys(options);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">
              {props.description}
            </p>
            <div className="container -100">
              <select className="m-2 h-100 bg-success ">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100  bg-success rounded">
              {priceOptions.map((data) => {
                return <option key={data} value={options[data]}>
                  {data} - Tk{options[data]}
                </option>;
              })}
              </select>

              <div className="d-inline h-100 fs-5">Total Price :</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
