import React from 'react'
import { ordinalSuffixOf } from '../utils/funcs';

export default function HabitInsights({habit}) {

    const numBlocks = 1;
    const numDoneInBlock = habit.doneDays;
    const insightClasses = "p-3 text-white rounded-bl-xl rounded-tr-xl w-3/4 mx-auto my-1 bg-calypso"
    return (
        <div className="p-2 flex flex-col">
            <p className={insightClasses}>This is your {ordinalSuffixOf(numBlocks)} block for this habit.</p>
            <p className={insightClasses}>{getNumDoneCommentary(numDoneInBlock)}</p>
        </div>
    )
}

const getNumDoneCommentary = numDone => {

    if (numDone < 5) {
        return "Looks like you're just starting with this block. Remember, a good start is a job half done."
    } else if (numDone < 17) {
        return `You're ${numDone} days in. Keep it up!`
    } else {
        return `With ${numDone} days under your belt, you're well into the block. We're sure you're feeling the habit growing on you.`
    }

}