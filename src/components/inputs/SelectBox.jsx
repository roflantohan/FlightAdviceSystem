


const SelectBox = ({options}) => {
    


    return (
        <div>
            <label></label>
            <Select 
                className="w-20"
                options={options}
                placeholder=""
              />
            <span>Correct</span>
        </div>
        
    )
}


export {SelectBox}
