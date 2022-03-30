import React from 'react';
import {nanoid} from 'nanoid';

export function setupGame(){
    return {
        id: nanoid(),
        isGameStarted: false,
        isEndGame: false,
        isWon: false,
        isNotEnoughLetters: false,
        isNotInWordList: false,
        isDailyDone: false,
        isFiveLetterWordleAvailable: true,
        isSevenLetterWordleAvailable: false,
        showMainMenuToaster: false,
        mainMenuToasterText: '',
    }
}

export function setupRows(numberOfTries, numberOfLetters){
    
    const newArray = new Array(numberOfTries).fill(new Array(numberOfLetters).fill(''));
    return newArray;

}

export function copyArray(previousArray){
    const newArray = [...previousArray.map(subArray => [...subArray])];
    return newArray;
}