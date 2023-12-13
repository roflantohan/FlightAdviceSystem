import style from "../styles/AdviceList.module.scss"

const AdviceBox = () => {

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

export {AdviceBox}
