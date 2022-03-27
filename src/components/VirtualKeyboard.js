import React, { Component } from 'react';
import {nanoid} from 'nanoid';
import VirtualKey from './VirtualKey';
import {checkForCellCorrectLetter, checkForCorrectLetterWrongCell, checkForWord} from '../utilities/Logic';


export default function VirtualKeyboard(props){
    const rowStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '.4rem',
        
        marginBottom: '.2rem'
    }
    
    const keyboardRows01= [];
    const keyboardRows02= [];
    const keyboardRows03= [];

    for(let i=0; i<10; i++){
        keyboardRows01.push(
            <VirtualKey 
                key          = {props.keyboard[0][i].id}
                value        = {props.keyboard[0][i].value}
                isRight      = {props.keyboard[0][i].isRight}
                isWrongCell  = {props.keyboard[0][i].isWrongCell}
                isGuessed    = {props.keyboard[0][i].isGuessed}
                isWideButton = {props.keyboard[0][i].isWideButton}
                onclick      = {props.onclick}
            />
        )
    }
    for(let i=0; i<9; i++){
        keyboardRows02.push(
            <VirtualKey 
                key          = {props.keyboard[1][i].id}
                value        = {props.keyboard[1][i].value}
                isRight      = {props.keyboard[1][i].isRight}
                isWrongCell  = {props.keyboard[1][i].isWrongCell}
                isGuessed    = {props.keyboard[1][i].isGuessed}
                isWideButton = {props.keyboard[1][i].isWideButton}
                onclick      = {props.onclick}
            />
        )
    }
    for(let i=0; i<9; i++){
        keyboardRows03.push(
            <VirtualKey 
                key          = {props.keyboard[2][i].id}
                value        = {props.keyboard[2][i].value}
                isRight      = {props.keyboard[2][i].isRight}
                isWrongCell  = {props.keyboard[2][i].isWrongCell}
                isGuessed    = {props.keyboard[2][i].isGuessed}
                isWideButton = {props.keyboard[2][i].isWideButton}
                onclick      = {props.onclick}
            />
        )
    }
    
    
    return (
        <div className="keyboard-container">
            <div className="keyboard-row" style={rowStyle}>{keyboardRows01}</div>
            <div className="keyboard-row" style={rowStyle}>{keyboardRows02}</div>
            <div className="keyboard-row" style={rowStyle}>{keyboardRows03}</div>
        </div>
    )
}


export function updateKeyboard(prevKeyboard, rows, currentRow, word){
    return prevKeyboard.map(row => {
        return row.map(key => {
            if(!rows[currentRow-1].some(item => {return item === key.value})){
                return key
            }else{
                return{
                    ...key,
                    
                    isGuessed: true,
                    
                    isRight: ((key.value === rows[currentRow-1][0] && rows[currentRow-1][0] === word[0]) || 
                              (key.value === rows[currentRow-1][1] && rows[currentRow-1][1] === word[1]) ||
                              (key.value === rows[currentRow-1][2] && rows[currentRow-1][2] === word[2]) ||
                              (key.value === rows[currentRow-1][3] && rows[currentRow-1][3] === word[3]) || 
                              (key.value === rows[currentRow-1][4] && rows[currentRow-1][4] === word[4])) ? true : false,
    
                    isWrongCell: (checkForCorrectLetterWrongCell(key.value, word[0], word.split('')) ||
                            checkForCorrectLetterWrongCell(key.value, word[1], word.split('')) || 
                            checkForCorrectLetterWrongCell(key.value, word[2], word.split('')) || 
                            checkForCorrectLetterWrongCell(key.value, word[3], word.split('')) || 
                            checkForCorrectLetterWrongCell(key.value, word[4], word.split(''))) ? true : false
                
                }
            }
        });
    })

}


export function setupKeyboard(){
    // return [
    //     ['q','w','e','r','t','y','u','i','o','p'],
    //     ['a','s','d','f','g','h','j','k','l'],
    //     ['enter','z','x','c','v','b','n','m','<->']]
    return[[{
        id: nanoid(),
        value: 'q',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'w',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'e',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'r',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 't',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'y',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'u',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'i',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'o',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    },{
        id: nanoid(),
        value: 'p',
        isRight: false,
        isWrongCell: false,
        isGuessed: false,
        isWideButton: false,
    }],[
        {
            id: nanoid(),
            value: 'a',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 's',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'd',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'f',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'g',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'h',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'j',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'k',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        },{
            id: nanoid(),
            value: 'l',
            isRight: false,
            isWrongCell: false,
            isGuessed: false,
            isWideButton: false,
        }],[
            {
                id: nanoid(),
                value: 'enter',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: true,
            },{
                id: nanoid(),
                value: 'z',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: 'x',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: 'c',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: 'v',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: 'b',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: 'n',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: 'm',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: false,
            },{
                id: nanoid(),
                value: '<-',
                isRight: false,
                isWrongCell: false,
                isGuessed: false,
                isWideButton: true,
            },]]
}