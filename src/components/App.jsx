import style from "../styles/App.module.css";

import { useForm } from "react-hook-form"

import { MapBox } from "./MapBox";
import { AdviceBox } from "./AdviceBox";
import { InputBox } from "./InputBox";

function App() {

  return (
    <div className={style.general_view}>
      <div className={style.header}>
        <h2>Flight Advice System</h2>
      </div>

      <div className={style.filter_box}>
        <h3>Filters</h3>
        <div className={style.filter_container}>

          <form>
            <div className={style.filter_row}>
              <InputBox 
                title={"Aircraft indetification"}
                size="small" 
              />
            </div>

            <div className={style.filter_row}>
            </div>

            <div className={style.filter_row}>
            </div>

            <div className={style.filter_row}>
            </div>

            <div className={style.filter_row}>
            </div>

            <input type="submit" />
          </form>

        </div>
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
