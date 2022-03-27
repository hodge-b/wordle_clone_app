import {checkForClearKey, checkForEnterKey, checkForTargetWord, checkForWord} from './utilities/Logic';
import {setupRows, setupGame, copyArray} from './utilities/Utilities';
import {setupGuessList, setupWordList, setupWord} from './utilities/WordList';
import VirtualKeyboard, {setupKeyboard, updateKeyboard} from './components/VirtualKeyboard';
import React, {useState, useEffect} from 'react';
import WordleRow from './components/WordleRow';
import Toaster from './components/Toaster';
import Confetti from 'react-confetti';
import './style.css';


// constants
const NUMBER_OF_TRIES = 6;
const NUMBER_OF_LETTERS = 5;


export default function App(){


    const [usedKeys, setUsedKeys] = useState([]);
    const [app, setApp] = useState(setupGame());
    const [rows, setRows] = useState(setupRows(NUMBER_OF_TRIES, NUMBER_OF_LETTERS));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCell, setCurrentCell] = useState(0);
    const [word, setWord] = useState(setupWord());
    const [wordList] = useState(setupWordList());
    const [guessList] = useState(setupGuessList());
    const [keyboard, setKeyboard] = useState(setupKeyboard());


    // check for winning conditions
    useEffect(() => {

        let userWord = '';
        
        if(currentRow > 0) userWord = rows[currentRow-1].reduce((res,item) => {return res + item});

        // game ends
        if(currentRow >= NUMBER_OF_TRIES){
            if(checkForTargetWord(userWord, word)){
                setApp(prevApp=> {return{...prevApp, isWon: true, isEndGame: true}})
            }else{
                setApp(prevApp => {return{...prevApp, isEndGame: true}})
            }
        }else{
            if(checkForTargetWord(userWord, word)){
                setApp(prevApp=> {return{...prevApp, isWon: true, isEndGame: true}})
            }else{
                if(currentRow === 1){
                    setKeyboard(prevKeyboard => {return updateKeyboard(prevKeyboard, rows, currentRow, word)});
                }else if(currentRow === 2){
                    setKeyboard(prevKeyboard => {return updateKeyboard(prevKeyboard, rows, currentRow, word)});
                }else if(currentRow === 3){
                    setKeyboard(prevKeyboard => {return updateKeyboard(prevKeyboard, rows, currentRow, word)});
                }else if(currentRow === 4){
                    setKeyboard(prevKeyboard => {return updateKeyboard(prevKeyboard, rows, currentRow, word)});
                }else if(currentRow === 5){
                    setKeyboard(prevKeyboard => {return updateKeyboard(prevKeyboard, rows, currentRow, word)});
                }
            }
        }
        
    },[currentRow]);

    // for toaster timeouts
    useEffect(() => {
        setTimeout(()=> {
            setApp(prevApp => {return{...prevApp, isNotEnoughLetters: false}})
        },1500)
    },[app.isNotEnoughLetters])

    useEffect(() => {
        setTimeout(()=> {
            setApp(prevApp => {return{...prevApp, isNotInWordList: false}})
        },1500)
    },[app.isNotInWordList])

    function onClickHandler(event){
        newGame();
    }

    function onKeyPressHandler(event){

        const userWord = rows[currentRow].reduce((res,item) => {return res + item});
        const key = event.target.className.split(' ')[1];
        const updatedRows = copyArray(rows);


        // game logic
        // if game is not ended
        if(!app.isEndGame){

            //  on user press enter
            if(checkForEnterKey(key)){
                
                if(currentCell < NUMBER_OF_LETTERS){
                    setApp(prevApp => {return{...prevApp, isNotEnoughLetters: true}})
                    return;
                }else if(!checkForWord(userWord, wordList) && !checkForWord(userWord, guessList)){
                    setApp(prevApp => {return{...prevApp, isNotInWordList: true}})
                    return;
                }else{
                    setUsedKeys([...usedKeys, key]);
                    setCurrentRow(currentRow + 1);
                    setCurrentCell(0);
                }

            // on user clear
            }else if(checkForClearKey(key)){
                updatedRows[currentRow][currentCell-1] = '';
                currentCell > 0 ? setCurrentCell(currentCell - 1) : setCurrentCell(0);
                setRows(updatedRows);
            
            // add user key
            }else{
                updatedRows[currentRow][currentCell] = key;
                currentCell < NUMBER_OF_LETTERS ? setCurrentCell(currentCell + 1) : setCurrentCell(NUMBER_OF_LETTERS) ;
                setRows(updatedRows);
            }
        }else{
            return;
        }
    }

    function newGame(){
        setApp(setupGame());
        setApp(prevApp => {return {...prevApp, isGameStarted: true}})
        setRows(setupRows(NUMBER_OF_TRIES, NUMBER_OF_LETTERS));
        setCurrentRow(0);
        setCurrentCell(0);
        setWord(setupWord());
        setKeyboard(setupKeyboard())
    }
    

    return(
        <main>
            <h1 className='app-title'>Wordle</h1>
            <h3 className='app-subtitle'>in react</h3>
            {!app.isGameStarted ? 
            <>
                <div className="btn btn--daily" onClick={onClickHandler}>daily wordle</div>
                <div className="btn btn--new" onClick={onClickHandler}>new wordle</div>
            </>: 
            <>
                <WordleRow
                    isGuessed = {currentRow > 0}
                    value = {rows[0]}
                    target = {word}
                />
                <WordleRow
                    isGuessed = {currentRow > 1}
                    value = {rows[1]}
                    target = {word}
                />
                {app.isEndGame ? app.isWon ? <Toaster value='You win!' /> :  <Toaster value={word} /> : app.isNotInWordList ? <Toaster value='not in wordlist' /> : app.isNotEnoughLetters ? <Toaster value='not enough letters' /> : ''}
                <WordleRow
                    isGuessed = {currentRow > 2}
                    value = {rows[2]}
                    target = {word}
                />
                <WordleRow
                    isGuessed = {currentRow > 3}
                    value = {rows[3]}
                    target = {word}
                />
                <WordleRow
                    isGuessed = {currentRow > 4}
                    value = {rows[4]}
                    target = {word}
                />
                <WordleRow
                    isGuessed = {currentRow > 5}
                    value = {rows[5]}
                    target = {word}
                />
            
                {!app.isEndGame ? <VirtualKeyboard  
                    keyboard = {keyboard}
                    target   = {word}
                    value    = {rows}
                    currentRow = {currentRow}
                    onclick  ={onKeyPressHandler} 
                /> : app.isWon ? (<><Confetti /><button className='btn--newGame' onClick={newGame}>Play New Wordle</button></>) : <button className='btn--newGame' onClick={newGame}>Play New Wordle</button>}
            </>}
        </main>
    )
}