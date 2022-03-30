import React from 'react';

export function checkForEnterKey(key){
    return key === 'enter' ? true : false;
}

export function checkForClearKey(key){
    return key === '<-' ? true : false;
}

export function checkForTargetWord(word, target){
    return word === target;
}

export function checkForWord(word, list){
    return list.find(item => {return item === word});
}

export function checkForCellCorrectLetter(letter, targetLetter){
    return letter === targetLetter;
}

export function checkForCorrectLetterWrongCell(letter, targetLetter, word){
    return letter === targetLetter ? false : word.find(item => {return item === letter})
}

export function checkForTooManyGuessedOfLetter(word, targetWord, cellIndex){
    
    let guessedLetter = word[cellIndex];
    let guessedLetterCount = 0;
    let targetLetterCount = 0;

    targetWord.forEach(item => {
        if(item === guessedLetter){
            targetLetterCount++;
        }
    })
    word.forEach(guessItem => {
        if(guessItem === guessedLetter){
            guessedLetterCount++;
        }
    })

    if(guessedLetterCount > targetLetterCount){
        if(cellIndex > word.indexOf(guessedLetter)){
            return true;
        }else{
            return false;
        }
        
    }else{
        return false;
    }

}