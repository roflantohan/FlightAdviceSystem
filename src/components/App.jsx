import { Form } from "./Form";
import { MapBox } from "./MapBox";
import { AdviceBox } from "./AdviceBox";

import style from "../styles/App.module.css";

function App() {
  

  return (
    <div className={style.general_view}>
      <div className={style.header}>
        <h2>Flight Advice System</h2>
      </div>
      <div className={style.filter_box}>
        <Form />
      </div>
      <div className={style.advice_box}>
        <AdviceBox />
      </div>
      <div className={style.map_box}>
        <MapBox />
      </div>
    </div>
  );
}

export {App};
