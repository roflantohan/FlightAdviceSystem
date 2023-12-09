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
      <div className="flex">
        <div className="w-3/5 m-2">
          <MapBox />
        </div>
        <div className="w-2/5 m-2 border border-black">
          <AdviceBox />
        </div>
      </div>

    </div>
  );
}

export { App };
