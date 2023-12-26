
const AdviceBox = ({flag, data}) => {

    const successMsg = () => {
      return (
        <div className="m-5 font-sans">
          <h3 className="mb-2 text-xl font-bold text-green-600">Congratulations!</h3>
          <p>
            The program did not find any conflicting flight plans with the proposed one!
          </p>
          <p className="mt-2">
            Follow the instructions of the Air Traffic Controller on the route. Have a safe flight!
          </p>
        </div>
      )
    }

    const failMsg = () => {
      return (
        <div className="m-5 font-sans">
          <h3 className="mb-2 text-xl font-bold text-red-600">ALARM!</h3>
          <p>
            The proposed flight plan may lead to a conflict situation on a certain part of the route!!!
          </p>
          <p className="mt-2">
            Recommendation:
          </p>
          <ul className="list-disc ml-9">
            <li>Reschedule departure time if possible</li>
            <li>Increase altitude</li>
            <li>Reduce speed</li>

          </ul>
        </div>
      )
    }

    return flag !== null ? (flag ? successMsg() : failMsg()) : null;
}

export {AdviceBox}
