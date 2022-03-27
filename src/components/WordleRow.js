import React from 'react';
import {checkForCellCorrectLetter, checkForCorrectLetterWrongCell} from '../utilities/Logic';
import WordleCell from './WordleCell';

export default function WordleRow(props){

    const cell = props.value;

    return(
        <div className="wordle-row">
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[0]}
                isRight = {checkForCellCorrectLetter(cell[0], props.target[0])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[0], props.target[0], props.target.split(''))}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[1]}
                isRight = {checkForCellCorrectLetter(cell[1], props.target[1])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[1], props.target[1], props.target.split(''))}
                
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[2]}
                isRight = {checkForCellCorrectLetter(cell[2], props.target[2])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[2], props.target[2], props.target.split(''))}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[3]}
                isRight = {checkForCellCorrectLetter(cell[3], props.target[3])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[3], props.target[3], props.target.split(''))}
            />
            <WordleCell
                isGuessed = {props.isGuessed}
                value = {cell[4]}
                isRight = {checkForCellCorrectLetter(cell[4], props.target[4])}
                isWrongCell = {checkForCorrectLetterWrongCell(cell[4], props.target[4], props.target.split(''))}
            />
        </div>
    )
}