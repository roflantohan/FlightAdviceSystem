

const createSelectOptions = (arrOptions) => {
    return arrOptions.map(option => {
        return { value: option, label: option }
    })
}


export {createSelectOptions}