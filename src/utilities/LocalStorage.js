import React from 'react';

export function saveStateToDevice(key, value){
    localStorage.setItem(key, value);
}

export function readStateFromDevice(key, defaultValue = ''){
    const item = localStorage.getItem(key);
    const init = JSON.parse(item);
    return init || defaultValue;
}

export function resetStatesOnDevice(){
    // daily mode
    localStorage.setItem('dailyModeTotalGamesPlayed', 0);
    localStorage.setItem('dailyModeTotalGamesWon', 0);
    localStorage.setItem('dailyModeWinPercent', 0);
    localStorage.setItem('dailyModeCurrentStreak', 0);
    localStorage.setItem('dailyModeHighestStreak', 0);

    // free mode
    localStorage.setItem('freeModeTotalGamesPlayed', 0);
    localStorage.setItem('freeModeTotalGamesWon', 0);
    localStorage.setItem('freeModeWinPercent', 0);
    localStorage.setItem('freeModeCurrentStreak', 0);
    localStorage.setItem('freeModeHighestStreak', 0);
}