import { useState } from "react";
import { useForm } from "react-hook-form"
import Select from 'react-select';
import DatePicker from "react-datepicker";

import style from "../styles/Form.module.css"
import "react-datepicker/dist/react-datepicker.css";


import {
    FlightRulesOptions,
    TypeOfFlightOptions,
    WakeTurbulenceCatOptions,
} from "../libs/constants.js";

const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = (data) => console.log(data)

    console.log(watch("example")) // watch input value by passing the name of it


    return (
        <div className={style.filter_container}>
            <form>
                
                <div className="flex m-2">

                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Aircraft indetification
                        </label><br />
                        <input type="text" className="w-32 h-9 border border-gray-300 rounded" />
                    </div>
                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Flight Rules
                        </label>
                        <Select
                            className="w-20"
                            options={FlightRulesOptions}
                            placeholder=""
                        />
                    </div>
                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Type of flight
                        </label>
                        <Select
                            className="w-20"
                            options={TypeOfFlightOptions}
                            placeholder=""
                        />
                    </div>
                    
                </div>

                <div className="flex m-2">
                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Type of aircraft
                        </label><br />
                        <input type="text" className="w-32 h-9 border border-gray-300 rounded" />
                    </div>
                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Wake Turbulance Cat
                        </label>
                        <Select
                            className="w-20"
                            options={WakeTurbulenceCatOptions}
                            placeholder=""
                        />
                    </div>
                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Equipment
                        </label><br />
                        <input type="text" className="w-32 h-9 border border-gray-300 rounded" />
                    </div>
                </div>

                <div className="flex m-2">
                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Departure aerodrom
                        </label><br />
                        <input type="text" className="w-32 h-9 border border-gray-300 rounded" />
                    </div>

                    <div className="w-fit mr-2">
                        <label className="text-xs">
                            Time
                        </label><br />
                        <DatePicker 
                            className=" h-9 border border-gray-300 rounded" 
                            showTimeSelect
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            dateFormat="MM.dd.yyyy h:mm:aa"
                        />
                    </div>



                </div>

                <div className="flex m-2">
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}


export { Form }
