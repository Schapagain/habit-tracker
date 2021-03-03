import React,{useState,useContext} from 'react';
import { DateTime } from 'luxon';
import classNames from 'classnames';
import { GlobalContext } from '../context/GlobalState';
import HabitBlock from '../utils/HabitBlock';
import Panel from './Panel';
import BackButton from './BackButton';
import Button from './Button';
import { useHistory } from 'react-router-dom';

const Form = () => {
  const { addHabit } = useContext(GlobalContext);
  const history = useHistory();
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [startDate] = useState(DateTime.now());
  const [nameError,setNameError] = useState(false);

  const resetStates = () => {
      setNameError(false);
      setName("");
      setDescription("");
  }

  const handleSubmit = () => {

    if (!name.length) {
        setNameError(true);
        return;
    }else{
        resetStates();
        const newHabit = new HabitBlock(name,description,startDate);
        addHabit(newHabit);
        history.goBack();
    }

  }

  const defaultInputClasses = 'w-full text-center h-10 px-3 text-base placeholder-opacity-50 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300';
  const nameStyle = classNames(defaultInputClasses,{
    'ring ring-red-400 ring-width-2':nameError
  })
  return (
    <form 
    onSubmit={(e)=>{e.preventDefault();handleSubmit()}} 
    className="text-gray-700 rounded-lg">
        <div className="flex p-2 flex-col">
            <div className="w-full m-2 px-2">
            <label className="block mb-1 text-white" htmlFor="habitName">What do you wanna work on?</label>
            <input 
            id="habitName"
            placeholder="Practice meditation, for e.g." 
            className={nameStyle}
            type="text" 
            onFocus={()=>setNameError(false)}
            onChange={(e) => setName(e.target.value)} 
            value={name}
            />
            </div>
            <div className="w-full m-2 px-2">
            <label className="block mb-1 text-white" htmlFor="habitDescription">A short description..</label>
            <input 
            id="habitDescription"
            placeholder="10 minutes a day, for e.g."
            className={defaultInputClasses}
            type="text"
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
            />
            </div>
            <div className="w-full m-2 px-2">
            <label className="block text-white mb-1" htmlFor="habitStartDate">Start from:</label>
            <input 
            disabled
            className={defaultInputClasses}
            type="text" 
            id="habitStartDate"
            value={startDate.toFormat('DD')}
            />
            </div>
            <Button 
              className={`items-center py-2 px-4
              text-white bg-kabul rounded-xl 
              hover:bg-kabul`} 
              text="Start Tracking!"
              onClick={handleSubmit}
              />  
        </div>
    </form>
  )
}

const AddHabitForm = () => {

  return (
    <div className="w-full h-screen m-auto justify-center flex">
      <BackButton className="my-auto hover:-translate-x-1"/>
      <Panel 
      content = {<Form />}
      /> 
    </div>
  );
}

export default AddHabitForm;