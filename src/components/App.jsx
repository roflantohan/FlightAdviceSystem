import { Form } from "./Form";
import { MapBox } from "./MapBox";
import { AdviceBox } from "./AdviceBox";
import { useEffect, useState } from "react";
import AIR_DATA from "../libs/constants"
import {searchConfilct} from "../libs"

function App() {
  const [adviceFlag, setAdviceFlag] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [myFlightPlan, setMyFlightPlan] = useState(null);

  useEffect(() => {
    if(myFlightPlan && myFlightPlan.R.length > 1){
      const dots = searchConfilct(AIR_DATA.OTHERS_FP, myFlightPlan)
      setConflicts(dots);
      if(dots.length) setAdviceFlag(false)
      else setAdviceFlag(true)
    }
    
  }, [myFlightPlan])

  return (
    <div className="font-sans">
      <div className="w-full text-center p-3 bg-slate-600 text-white">
        <h2 className="text-2xl font-bold pt-1">Flight Advice System</h2>
      </div>
      <div className="w-full border border-black">
        <Form handleFP={(fp) => {setMyFlightPlan(fp)}}/>
      </div>
      <div className="flex">
        <div className="w-3/5 m-2">
          <MapBox myFP={myFlightPlan} conflicts={conflicts} />
        </div>
        <div className="w-2/5 m-2 border border-black">
          <AdviceBox flag={adviceFlag} />
        </div>
      </div>

    </div>
  );
}

export { App };
