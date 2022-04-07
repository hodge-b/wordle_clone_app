import {SaveStateToDevice, ReadStateFromDevice} from './LocalStorage';
import React from 'react';
import {nanoid} from 'nanoid';


export function setupGame(daily){
    return {
        id: nanoid(),
        isGameStarted: false,
        isEndGame: false,
        isWon: false,
        showConfetti: false,
        showWinToaster: false,
        isNotEnoughLetters: false,
        isNotInWordList: false,
        isDailyDone: false,
        isDailyMode: daily,
        isFreeMode: !daily,
        showMainMenuToaster: false,
        showStatsModal: false,
        showStatsDaily: true,
        mainMenuToasterText: '',
    }
}

export function setupStats(){
    return {
        id: nanoid(),
        dailyModeTotalGamesPlayed: 0,
        dailyModeTotalGamesWon: 0,
        dailyModeCurrentStreak: 0,
        dailyModeHighestStreak: 0,
        dailyModeWinPercent: 0,
        freeModeTotalGamesPlayed: 0,
        freeModeTotalGamesWon: 0,
        freeModeCurrentStreak: 0,
        freeModeHighestStreak: 0,
        freeModeWinPercent: 0,
        previousDailyWord: '',
        previousDailyDone: false
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

export function setupWinningText(){
    const winningText = ['Great','Success','You Win', 'Superb', 'Awesome','Wicked', 'Nailed It'];
    return winningText[(Math.floor(Math.random()*winningText.length))];
}

export function setupTabIndex(numberOfTries, numberOfLetters){
    const newArray = new Array(numberOfTries).fill(new Array(numberOfLetters).fill(1));
    return newArray;
}