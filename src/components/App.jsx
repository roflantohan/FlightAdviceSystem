import { Form } from "./Form";
import { MapBox } from "./MapBox";
import { AdviceBox } from "./AdviceBox";

import style from "../styles/App.module.css";

function App() {
  

  return (
    <div className="font-sans">
      <div className="w-full text-center p-3 bg-slate-600 text-white">
        <h2 className="text-2xl font-bold pt-1">Flight Advice System</h2>
      </div>
      <div className="w-full border border-black">
        <Form />
      </div>
      <div className={style.map_box}>
        <MapBox />
      </div>
      <div className={style.advice_box}>
        <AdviceBox />
      </div>
    </div>
  );
}

export {App};
