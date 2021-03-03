import React from 'react'
import classNames from 'classnames';

export const Panel = ({className,content}) => {

    const mainClass = classNames(className,
        "flex flex-col justify-center h-2/3 mx-4 my-auto rounded-xl p-4 bg-calypso w-full sm:w-1/2 lg:w-1/3"
        )
    return (
        <div className = {mainClass}>
            {content}
        </div>
    )
}

export default Panel;