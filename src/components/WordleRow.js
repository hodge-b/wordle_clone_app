import React from 'react';
import {checkForCellCorrectLetter, checkForCorrectLetterWrongCell, checkForTooManyGuessedOfLetter} from '../utilities/Logic';
import WordleCell from './WordleCell';

export default function WordleRow(props){

    const cell = props.value;

    return(
        <div className="wordle-row">
            <WordleCell
                isGuessed = {props.isGuessed}
                tabIndex = {props.tabIndex[0]}
                value = {cell[0]}
                //isActive = {props.currentCell === 0 ? true : false}
                isRight = {checkForCellCorrectLetter(cell[0], props.target[0])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[0], props.target[0], props.target.split(''))}
                isTooManyOfGuessedLetter = {!checkForCellCorrectLetter(cell[0], props.target[0]) && 
                                            checkForCorrectLetterWrongCell(cell[0], props.target[0], props.target.split('')) && 
                                            checkForTooManyGuessedOfLetter(cell, props.target.split(''), 0)}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[1]}
                tabIndex = {props.tabIndex[1]}
                //isActive = {props.currentCell === 1 ? true : false}
                isRight = {checkForCellCorrectLetter(cell[1], props.target[1])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[1], props.target[1], props.target.split(''))}
                isTooManyOfGuessedLetter = {!checkForCellCorrectLetter(cell[1], props.target[1]) && 
                                            checkForCorrectLetterWrongCell(cell[1], props.target[1], props.target.split('')) && 
                                            checkForTooManyGuessedOfLetter(cell, props.target.split(''), 1)}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[2]}
                tabIndex = {props.tabIndex[2]}
                //isActive = {props.currentCell === 2 ? true : false}
                isRight = {checkForCellCorrectLetter(cell[2], props.target[2])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[2], props.target[2], props.target.split(''))}
                isTooManyOfGuessedLetter = {!checkForCellCorrectLetter(cell[2], props.target[2]) && 
                                            checkForCorrectLetterWrongCell(cell[2], props.target[2], props.target.split('')) &&
                                            checkForTooManyGuessedOfLetter(cell, props.target.split(''), 2)}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[3]}
                tabIndex = {props.tabIndex[3]}
                //isActive = {props.currentCell === 3 ? true : false}
                isRight = {checkForCellCorrectLetter(cell[3], props.target[3])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[3], props.target[3], props.target.split(''))}
                isTooManyOfGuessedLetter = {!checkForCellCorrectLetter(cell[3], props.target[3]) && 
                                            checkForCorrectLetterWrongCell(cell[3], props.target[3], props.target.split('')) &&
                                            checkForTooManyGuessedOfLetter(cell, props.target.split(''), 3)}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[4]}
                tabIndex = {props.tabIndex[4]}
                //isActive = {props.currentCell === 4 ? true : false}
                isRight = {checkForCellCorrectLetter(cell[4], props.target[4])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[4], props.target[4], props.target.split(''))}
                isTooManyOfGuessedLetter = {!checkForCellCorrectLetter(cell[4], props.target[4]) &&
                                            checkForCorrectLetterWrongCell(cell[4], props.target[4], props.target.split('')) &&
                                            checkForTooManyGuessedOfLetter(cell, props.target.split(''), 4)}
            />
        </div>
    )
}