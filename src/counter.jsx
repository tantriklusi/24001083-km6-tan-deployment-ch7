import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAngka } from "./redux/actions/counterActions";

export default function Counter() {
  const data = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Counter</div>
      <div>
        <button
          onClick={() => {
            dispatch(setAngka({ operasi: "kurang", jumlah: 1 }));
          }}
        >
          -
        </button>
        <div style={{ margin: "0 20px" }}> {data.angka}</div>
        <button
          onClick={() => {
            dispatch(setAngka({ operasi: "tambah", jumlah: 1 }));
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
