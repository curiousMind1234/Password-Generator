import './index.css'
import { useState } from 'react';
const Checkbox = ({ id, label, name }) => {

  const [checkedBox,setCheckedBox] = useState(false);
  
  function handleChange(event){
    setCheckedBox(event.target.checked);
    console.log(event.target.name)
  }

  return (
    <div className="checkbox-wrapper">
      <input id={id} type="checkbox" checked={ checkedBox} name={name} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox
