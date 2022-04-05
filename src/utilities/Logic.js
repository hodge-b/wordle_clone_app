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
    const targetLetterIndex = [];
    const guessedLetterIndex = [];


    targetWord.forEach((item, index) => {
        if(item === guessedLetter) targetLetterIndex.push(index);
    })

    word.forEach((guessItem, index) => {
        if(guessItem === guessedLetter) guessedLetterIndex.push(index);
    })


    if(guessedLetterIndex.length > targetLetterIndex.length){
        
        for(let i=targetLetterIndex.length; i<guessedLetterIndex.length; i++){
            if(guessedLetterIndex[i] === cellIndex){
                return true;
            }else{
                if(word[targetLetterIndex] !== targetWord[targetLetterIndex]){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }else{
        return false;
    }
}