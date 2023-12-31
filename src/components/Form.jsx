import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AIR_DATA from "../libs/constants.js"
import { createSelectOptions } from "../libs/index.js";

const Form = ({handleFP}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [startDate, setstartDate] = useState(new Date());
  const [startTime, setstartTime] = useState(new Date());
  const [totalEET, settotalEET] = useState(new Date());

  const onSubmit = (data) => {
    const fp = {}

    fp.AI = data.aircraftIndetification;
    fp.FR = data.flightRules.value;
    fp.TF = data.typeOfFlight.value;
    fp.TA = data.typeOfAircraft.value;
    fp.EQ1 = data.equipment1.value;
    fp.EQ2 = data.equipment2.value;
    fp.WTC = data.wakeTurbulenceCat.value;
    fp.CS = Number(data.cruisingSpeed);
    fp.LVL = Number(data.level);
    fp.DESA = data.destinationAerodrom.value;
    fp.DEPA = data.departureAerodrom.value;
    fp.ALTA = data.altnAerodrom.value;
    fp.SALTA = data.secAltnAerodrom.value;
    fp.E = data.endurance;
    fp.R = data.routes.map(route => route.value)
    fp.SD = startDate;
    fp.ST = startTime;
    fp.EET = totalEET;

    handleFP(fp)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="border rounded bg-slate-200">
        <h3 className="m-2 text-xl font-bold">Flight Form</h3>
        <div className="flex m-2">
          <div className="flex m-2">

            <div className="w-fit mr-2">
              <label className="text-xs">Aircraft indetification</label>
              <br />
              <input
                type="text"
                className="w-32 h-9 border border-gray-300 rounded"
                {...register("aircraftIndetification", { required: true })}
              />
              <br />
              {errors.aircraftIndetification && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>

            <div className="w-fit mr-2">
              <label className="text-xs">Flight Rules</label>
              <Controller
                name="flightRules"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.FlightRules)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.flightRules && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">Type of flight</label>
              <Controller
                name="typeOfFlight"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.TypeOfFlight)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.typeOfFlight && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex m-2">
            <div className="w-fit mr-2">
              <label className="text-xs">Type of aircraft</label>
              <Controller
                name="typeOfAircraft"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.TypeOfAircraft)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.typeOfAircraft && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">Equipment</label>
              <div className="flex">
                <Controller
                  name="equipment1"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="w-20 mr-1"
                      options={createSelectOptions(AIR_DATA.Equipment1)}
                      placeholder=""
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="equipment2"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="w-20"
                      options={createSelectOptions(AIR_DATA.Equipment2)}
                      placeholder=""
                      {...field}
                    />
                  )}
                />
              </div>
              {(errors.equipment1 || errors.equipment2) && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">Wake Turbulance Cat</label>
              <Controller
                name="wakeTurbulenceCat"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.WakeTurbulenceCat)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.wakeTurbulenceCat && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
          </div>



          <hr />

          <div className="flex m-2">
            <div className="w-fit mr-2">
              <label className="text-xs">Departure aerodrom</label>
              <Controller
                name="departureAerodrom"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.Aerodroms)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.departureAerodrom && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>

            <div className="w-fit mr-2">
              <label className="text-xs">Date flight</label>
              <br />
              <DatePicker
                    className="w-32 h-9 border border-gray-300 rounded text-center"
                    selected={startDate}
                    onChange={(date) => setstartDate(date)}
                    dateFormat="dd.MM.yyyy"
              />
              <br />
              {errors.dateFlight && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>



            <div className="w-fit mr-2">
              <label className="text-xs">Time flight</label>
              <br />
              <DatePicker
                    className="w-32 h-9 border border-gray-300 rounded text-center"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    selected={startTime}
                    onChange={(date) => setstartTime(date)}
                    dateFormat="hh:mm:aa"
                  />
              <br />
              {errors.timeFlight && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
          </div>

        </div>

        <div className="flex m-2">



          <div className="flex m-2">
            <div className="w-fit mr-2">
              <label className="text-xs">Cruising speed</label>
              <br />
              <input
                type="text"
                className="w-32 h-9 border border-gray-300 rounded"
                {...register("cruisingSpeed", { required: true })}
              />
              <br />
              {errors.cruisingSpeed && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">Level</label>
              <br />
              <input
                type="text"
                className="w-32 h-9 border border-gray-300 rounded"
                {...register("level", { required: true })}
              />
              <br />
              {errors.level && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">Total eet</label>
              <br />
              <DatePicker
                    className="w-32 h-9 border border-gray-300 rounded text-center"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    selected={totalEET}
                    onChange={(date) => settotalEET(date)}
                    dateFormat="hh:mm"
                  />
              <br />
              {errors.totalEET && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <hr />
          <div className="flex m-2">
            <div className="w-fit mr-2">
              <label className="text-xs">Destination Aerodrom</label>
              <br />
              <Controller
                name="destinationAerodrom"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.Aerodroms)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.destinationAerodrom && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">Altn aerodrom</label>
              <br />
              <Controller
                name="altnAerodrom"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.Aerodroms)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.altnAerodrom && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-fit mr-2">
              <label className="text-xs">2nd altn aerodrom</label>
              <br />
              <Controller
                name="secAltnAerodrom"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-32"
                    options={createSelectOptions(AIR_DATA.Aerodroms)}
                    placeholder=""
                    {...field}
                  />
                )}
              />
              {errors.secAltnAerodrom && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <hr />

          <div className="flex m-2">
            <div className="w-fit mr-2">
              <label className="text-xs">Endurance</label>
              <br />
              <input
                type="text"
                className="w-32 h-9 border border-gray-300 rounded"
                {...register("endurance", { required: true })}
              />
              <br />
              {errors.endurance && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex m-2">
            <div className="w-fit mr-2">
              <label className="text-xs">Routes</label>
              <br />
              <Controller
                name="routes"
                className="z-0"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CreatableSelect
                    className="w-72"
                    isClearable
                    isMulti
                    options={createSelectOptions(AIR_DATA.POINTS)}
                    {...field}
                  />
                )}
              />
              {errors.routes && (
                <span className="text-xs text-red-500 font-bold">
                  This field is required
                </span>
              )}
            </div>

          </div>

        </div>

        <div className="flex m-2">

          <div className="flex float-right m-2 mr-3">
            <button className="border border-gray-300 rounded p-1 bg-slate-50" type="submit">
              Check
            </button>
          </div>
          <div className="flex float-right m-2 mr-3">
            <button className="border border-gray-300 rounded p-1 bg-slate-50" type="reset">
              Reset
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export { Form };
