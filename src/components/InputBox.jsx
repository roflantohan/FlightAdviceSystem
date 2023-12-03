import { useState } from "react"

import style from "../styles/InputBox.module.css"

const InputBox = ({size, title}) => {
    const [status, setStatus] = useState(true);
    const [data, setData] = useState("");


    const sizeBox = {
        "small": style.filter_input_small,
        "medium": style.filter_input_medium,
        "large": style.filter_input_large,
    }[size]


    return (
        <div className={sizeBox}>
            <label>{title}</label>
            <input />
            <span>Correct</span>
        </div>
    )
    
}

export {InputBox}