import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

export const BackButton = ({className}) => {
    const history = useHistory();
    const mainClass = classNames(className,
        'text-5xl text-black cursor-pointer p-2 rounded-full transition transform hover:text-white hover:bg-kabul'
        )
    return (
        <IoArrowBackSharp onClick={()=>history.goBack()} className={mainClass}/>
    )
}
export default BackButton;