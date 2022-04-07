import {checkForClearKey, checkForEnterKey, checkForTargetWord, checkForWord} from './utilities/Logic';
import {setupRows, setupGame, copyArray, setupWinningText, setupStats} from './utilities/Utilities';
import {setupGuessList, setupWordList, setupWord, setupDailyWord} from './utilities/WordList';
import VirtualKeyboard, {setupKeyboard, updateKeyboard} from './components/VirtualKeyboard';
import {readStateFromDevice, saveStateToDevice, resetStatesOnDevice} from './utilities/LocalStorage';
import {useState, useEffect} from 'react';
import WordleRow from './components/WordleRow';
import StatsModal from './components/StatsModal';
import Toaster from './components/Toaster';
import Confetti from 'react-confetti';
import './style.css';


// constants
const WORDLE_NUMBER_OF_TRIES      = 6;
const WORDLE_NUMBER_OF_LETTERS    = 5;


export default function App(){

    const [stats, setStats] = useState(setupStats());
    const [usedKeys, setUsedKeys] = useState([]);
    const [tabIndex] = useState(WORDLE_NUMBER_OF_TRIES, WORDLE_NUMBER_OF_LETTERS);
    const [app, setApp] = useState(setupGame());
    const [rows, setRows] = useState(setupRows(WORDLE_NUMBER_OF_TRIES, WORDLE_NUMBER_OF_LETTERS));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCell, setCurrentCell] = useState(0);
    const [word, setWord] = useState({});
    const [wordList] = useState(setupWordList());
    const [guessList] = useState(setupGuessList());
    const [keyboard, setKeyboard] = useState(setupKeyboard());


    // check for winning conditions
    useEffect(() => {
        
        let userWord = '';
        
        if(currentRow > 0) userWord = rows[currentRow-1].reduce((res,item) => {return res + item});
        

        // game ends
        if(currentRow >= WORDLE_NUMBER_OF_TRIES){

            // guessed correctly on try 6
            if(checkForTargetWord(userWord, word)){
                setApp(prevApp=> {return{...prevApp, isWon: true, isEndGame: true, showConfetti: true, showEndGameToaster: true}})
                if(app.isDailyMode) setStats(prevStats => {return{...prevStats, previousDailyWord: word}});
                if(app.isDailyMode){
                    setStats(prevStat => {return{...prevStat,dailyModeTotalGamesPlayed: stats.dailyModeTotalGamesPlayed + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeTotalGamesWon: stats.dailyModeTotalGamesWon + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeWinPercent: Math.floor((stats.dailyModeTotalGamesWon + 1) / (stats.dailyModeTotalGamesPlayed + 1) * 100)}})
                    setStats(prevStat => {return{...prevStat, dailyModeCurrentStreak: stats.dailyModeCurrentStreak + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeHighestStreak: stats.dailyModeHighestStreak <= stats.dailyModeCurrentStreak ? stats.dailyModeHighestStreak + 1 : stats.dailyModeHighestStreak}})
                }else{
                    setStats(prevStat => {return{...prevStat,freeModeTotalGamesPlayed: stats.freeModeTotalGamesPlayed + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeTotalGamesWon: stats.freeModeTotalGamesWon + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeWinPercent: Math.floor((stats.freeModeTotalGamesWon + 1) / (stats.freeModeTotalGamesPlayed + 1) * 100)}})
                    setStats(prevStat => {return{...prevStat, freeModeCurrentStreak: stats.freeModeCurrentStreak + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeHighestStreak: stats.freeModeHighestStreak <= stats.freeModeCurrentStreak ? stats.freeModeHighestStreak + 1 : stats.freeModeHighestStreak}})
                }
                
                
            // user did not win and used all 6 tries
            }else{
                setApp(prevApp => {return{...prevApp, isEndGame: true, showEndGameToaster: true}})
                if(app.isDailyMode) setStats(prevStats => {return{...prevStats, previousDailyWord: word}});
                if(app.isDailyMode){
                    setStats(prevStat => {return{...prevStat,dailyModeTotalGamesPlayed: stats.dailyModeTotalGamesPlayed + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeWinPercent: Math.floor(stats.dailyModeTotalGamesWon / (stats.dailyModeTotalGamesPlayed + 1)* 100)}})
                    setStats(prevStat => {return{...prevStat, dailyModeCurrentStreak: 0}})
                }else{
                    setStats(prevStat => {return{...prevStat,freeModeTotalGamesPlayed: stats.freeModeTotalGamesPlayed + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeWinPercent: Math.floor(stats.freeModeTotalGamesWon / (stats.freeModeTotalGamesPlayed + 1)* 100)}})
                    setStats(prevStat => {return{...prevStat, freeModeCurrentStreak: 0}})
                }
            }

        }else{

            // guessed correct word before total tries
            if(checkForTargetWord(userWord, word)){
                setApp(prevApp=> {return{...prevApp, isWon: true, isEndGame: true, showConfetti: true, showEndGameToaster: true}})
                if(app.isDailyMode) setStats(prevStats => {return{...prevStats, previousDailyWord: word}});
                if(app.isDailyMode){
                    setStats(prevStat => {return{...prevStat,dailyModeTotalGamesPlayed: stats.dailyModeTotalGamesPlayed + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeTotalGamesWon: stats.dailyModeTotalGamesWon + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeWinPercent: Math.floor((stats.dailyModeTotalGamesWon + 1) / (stats.dailyModeTotalGamesPlayed + 1)* 100)}})
                    setStats(prevStat => {return{...prevStat, dailyModeCurrentStreak: stats.dailyModeCurrentStreak + 1}})
                    setStats(prevStat => {return{...prevStat, dailyModeHighestStreak: stats.dailyModeHighestStreak <= stats.dailyModeCurrentStreak ? stats.dailyModeHighestStreak + 1 : stats.dailyModeHighestStreak}})
                }else{
                    setStats(prevStat => {return{...prevStat,freeModeTotalGamesPlayed: stats.freeModeTotalGamesPlayed + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeTotalGamesWon: stats.freeModeTotalGamesWon + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeWinPercent: Math.floor((stats.freeModeTotalGamesWon + 1) / (stats.freeModeTotalGamesPlayed + 1) * 100)}})
                    setStats(prevStat => {return{...prevStat, freeModeCurrentStreak: stats.freeModeCurrentStreak + 1}})
                    setStats(prevStat => {return{...prevStat, freeModeHighestStreak: stats.freeModeHighestStreak <= stats.freeModeCurrentStreak ? stats.freeModeHighestStreak + 1 : stats.freeModeHighestStreak}})
                }
                

            // game is not finished
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


    // timer for displaying confetti on winning condition
    useEffect(() => {
        setTimeout(() => {
            setApp(prevApp => {return{...prevApp, showConfetti: false}})
        },6000)
    },[app.showConfetti])


    // timer for displaying end game toaster
    useEffect(() => {
        setTimeout(() => {
            setApp(prevApp => {return{...prevApp, showEndGameToaster: false}})
        },5000)
    },[app.showEndGameToaster])


    // effect used to determine when to display end game stats
    useEffect(() => {
        if(app.showEndGameToaster) return;
        if(!app.showEndGameToaster && app.isEndGame){
            setApp(prevApp => {return{...prevApp, showStatsModal: true}})
        }
    },[app.showEndGameToaster])


    // timer used to display toaster when user did not use enough letters
    useEffect(() => {
        setTimeout(()=> {
            setApp(prevApp => {return{...prevApp, isNotEnoughLetters: false}})
        },1500)
    },[app.isNotEnoughLetters])


    // timer used to display toaster when user did not use a word from the word list
    useEffect(() => {
        setTimeout(()=> {
            setApp(prevApp => {return{...prevApp, isNotInWordList: false}})
        },1500)
    },[app.isNotInWordList])


    // timer used to display toaster on main menu
    useEffect(() => {
        setTimeout(() => {
            setApp(prevApp => {return{...prevApp, showMainMenuToaster: false}})
        },2500)
    },[app.showMainMenuToaster])

    useEffect(() => {
        if(app.isGameStarted) newGame();
    },[app.isDailyMode])


    // read states to device
    useEffect(() => {
        setStats(prevStats => {return{
            ...prevStats,
            // daily mode
            dailyModeTotalGamesPlayed: readStateFromDevice('dailyModeTotalGamesPlayed') !== '' ? readStateFromDevice('dailyModeTotalGamesPlayed') : 0,
            dailyModeTotalGamesWon: readStateFromDevice('dailyModeTotalGamesWon') !== '' ? readStateFromDevice('dailyModeTotalGamesWon') : 0,
            dailyModeWinPercent: readStateFromDevice('dailyModeWinPercent') !== '' ? readStateFromDevice('dailyModeWinPercent') : 0,
            dailyModeCurrentStreak: readStateFromDevice('dailyModeCurrentStreak') !== '' ? readStateFromDevice('dailyModeCurrentStreak') : 0,
            dailyModeHighestStreak: readStateFromDevice('dailyModeHighestStreak') !== '' ? readStateFromDevice('dailyModeHighestStreak') : 0,

            // free mode
            freeModeTotalGamesPlayed: readStateFromDevice('freeModeTotalGamesPlayed') !== '' ? readStateFromDevice('freeModeTotalGamesPlayed') : 0,
            freeModeTotalGamesWon: readStateFromDevice('freeModeTotalGamesWon') !== '' ? readStateFromDevice('freeModeTotalGamesWon') : 0,
            freeModeWinPercent: readStateFromDevice('freeModeWinPercent') !== '' ? readStateFromDevice('freeModeWinPercent') : 0,
            freeModeCurrentStreak: readStateFromDevice('freeModeCurrentStreak') !== '' ? readStateFromDevice('freeModeCurrentStreak') : 0,
            freeModeHighestStreak: readStateFromDevice('freeModeHighestStreak') !== '' ? readStateFromDevice('freeModeHighestStreak') : 0,
            previousDailyWord: readStateFromDevice('previousDailyWord') !== '' ? readStateFromDevice('previousDailyWord') : 'wordl',
            previousDailyDone: readStateFromDevice('previousDailyDone')
            // check for daily wordle completion
            
        }})
    },[app.showStatsModal])

    // save states to device
    useEffect(() => {
        // daily mode
        saveStateToDevice('dailyModeTotalGamesPlayed', stats.dailyModeTotalGamesPlayed);
        saveStateToDevice('dailyModeTotalGamesWon', stats.dailyModeTotalGamesWon);
        saveStateToDevice('dailyModeWinPercent', stats.dailyModeWinPercent);
        saveStateToDevice('dailyModeCurrentStreak', stats.dailyModeCurrentStreak);
        saveStateToDevice('dailyModeHighestStreak', stats.dailyModeHighestStreak);

        // free mode
        saveStateToDevice('freeModeTotalGamesPlayed', stats.freeModeTotalGamesPlayed);
        saveStateToDevice('freeModeTotalGamesWon', stats.freeModeTotalGamesWon);
        saveStateToDevice('freeModeWinPercent', stats.freeModeWinPercent);
        saveStateToDevice('freeModeCurrentStreak', stats.freeModeCurrentStreak);
        saveStateToDevice('freeModeHighestStreak', stats.freeModeHighestStreak);

        // save previous daily wordle word
        saveStateToDevice('previousDailyWord', stats.previousDailyWord);
        saveStateToDevice('previousDailyDone', stats.previousDailyDone);
    },[stats])


    // main menu buttons handler
    function onClickHandler(event){
        const buttonName = event.target.className.split(' ')[1].toString();
        
        switch(buttonName){
            case 'btn--stats':
                setApp(prevApp => {return{...prevApp, showStatsModal: true}});
                break;
            case 'btn--back':
                setApp(prevApp => {return{...prevApp, showStatsModal: false, isGameStarted: false}});
                break;
            case 'btn--daily-stats':
                setApp(prevApp => {return{...prevApp, showStatsDaily: true}})
                break;
            case 'btn--free-stats':
                setApp(prevApp => {return{...prevApp, showStatsDaily: false}})
                break;
            case 'btn--temp-delete':
                resetStatesOnDevice();
                setStats(prevStats => {return{
                    ...prevStats,
                    // daily mode
                    dailyModeTotalGamesPlayed: 0,
                    dailyModeTotalGamesWon: 0,
                    dailyModeWinPercent: 0,
                    dailyModeCurrentStreak: 0,
                    dailyModeHighestStreak: 0,

                    // free mode
                    freeModeTotalGamesPlayed: 0,
                    freeModeTotalGamesWon: 0,
                    freeModeWinPercent: 0,
                    freeModeCurrentStreak: 0,
                    freeModeHighestStreak: 0
                }})
                break;
            case 'btn--daily':
                if(stats.previousDailyWord === setupDailyWord()){
                    setApp(prevApp => {return{...prevApp, showMainMenuToaster: true, mainMenuToasterText: 'daily finished'}})
                }else{
                    setApp(setupGame(true));
                    setApp(prevApp => {return{...prevApp, showStatsDaily: true}})
                    newGame();
                }
                break;
            case 'btn--free':
                setApp(setupGame(false));
                setApp(prevApp => {return{...prevApp, showStatsDaily: false}})
                newGame();
                break;
            case 'btn--menu':
                setApp(prevApp => {return{...prevApp, showStatsModal: false, isGameStarted: false}});
                break;
            default:
                break;
        }
    }

    // virtual keyboard handler
    function onKeyPressHandler(event){

        const userWord = rows[currentRow].reduce((res,item) => {return res + item});
        const key = event.target.className.split(' ')[1];
        const updatedRows = copyArray(rows);


        // game logic
        // if game is not ended
        if(!app.isEndGame){

            //  on user press enter
            if(checkForEnterKey(key)){
                // check if guess have all five letters
                if(currentCell < WORDLE_NUMBER_OF_LETTERS){
                    setApp(prevApp => {return{...prevApp, isNotEnoughLetters: true}})
                    return;
                
                // check if guess is found within the guess list
                
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
                updatedRows[currentRow][currentCell - 1] = '';
                currentCell > 0 ? setCurrentCell(currentCell - 1) : setCurrentCell(0);
                setRows(updatedRows);
            
            // add user key
            }else{
                if(currentCell < 5) updatedRows[currentRow][currentCell] = key;
                currentCell < WORDLE_NUMBER_OF_LETTERS ? setCurrentCell(currentCell + 1) : setCurrentCell(WORDLE_NUMBER_OF_LETTERS) ;
                setRows(updatedRows);
            }
        }else{
            return;
        }
    }

    // this function sets up the game and resets all state values to default
    function newGame(){
        setApp(prevApp => {return {...prevApp, isGameStarted: true}})
        setApp(prevApp => {return {...prevApp, showStatsModal: false}})
        setRows(setupRows(WORDLE_NUMBER_OF_TRIES, WORDLE_NUMBER_OF_LETTERS));
        setCurrentRow(0);
        setCurrentCell(0);

        if(app.isDailyMode){
            setWord(setupDailyWord())
        }else{
            setWord(setupWord());
        }
        setKeyboard(setupKeyboard())
    }


    return(
        <main>
            <header>
                <h1 className='app-title'>Wordle</h1>
                <h3 className='app-subtitle'>in <span className='app-subtitle--primary'>react</span></h3>
            </header>
            {!app.isGameStarted ? 
            <>
                <div className="btn btn--daily" onClick={onClickHandler}>daily wordle</div>
                <div className="btn btn--free" onClick={onClickHandler}>free wordle</div>
                <div className="btn btn--stats" onClick={onClickHandler}>stats</div>
                {app.showMainMenuToaster ? <Toaster value={app.mainMenuToasterText} /> : ''}
                {app.showStatsModal ? 
                    <StatsModal 
                        isGameStarted          = {app.isGameStarted}
                        showStatsDaily         = {app.showStatsDaily}
                        dailyModeGamesPlayed   = {stats.dailyModeTotalGamesPlayed}
                        dailyModeGamesWon      = {stats.dailyModeTotalGamesWon}
                        dailyModeWinPercentage = {stats.dailyModeWinPercent}
                        dailyModeCurrentStreak = {stats.dailyModeCurrentStreak}
                        dailyModeMaxStreak     = {stats.dailyModeHighestStreak}
                        freeModeGamesPlayed    = {stats.freeModeTotalGamesPlayed}
                        freeModeGamesWon       = {stats.freeModeTotalGamesWon}
                        freeModeWinPercentage  = {stats.freeModeWinPercent}
                        freeModeCurrentStreak  = {stats.freeModeCurrentStreak}
                        freeModeMaxStreak      = {stats.freeModeHighestStreak}
                        onclick                = {onClickHandler}
                    /> : ''}
                <footer><small>Copyright © 2022 bradley hodge. All Rights Reserved.</small></footer>
            </>: 
            <>
                <>
                    <WordleRow
                        isSeptordle = {app.isGameSeptordle}
                        isGuessed = {currentRow > 0}
                        currentRow = {currentRow}
                        currentCell= {currentCell}
                        tabIndex = {tabIndex}
                        value = {rows[0]}
                        target = {word}
                    />
                    <WordleRow
                        isSeptordle = {app.isGameSeptordle}
                        isGuessed = {currentRow > 1}
                        currentRow = {currentRow}
                        currentCell= {currentCell}
                        tabIndex = {tabIndex}
                        value = {rows[1]}
                        target = {word}
                    />
                    {app.isNotInWordList ? <Toaster value='not in wordlist' /> : app.isNotEnoughLetters ? <Toaster value='not enough letters' /> : ''}
                    <WordleRow
                        isSeptordle = {app.isGameSeptordle}
                        isGuessed = {currentRow > 2}
                        currentRow = {currentRow}
                        currentCell= {currentCell}
                        tabIndex = {tabIndex}
                        value = {rows[2]}
                        target = {word}
                    />
                    <WordleRow
                        isSeptordle = {app.isGameSeptordle}
                        isGuessed = {currentRow > 3}
                        currentRow = {currentRow}
                        currentCell= {currentCell}
                        tabIndex = {tabIndex}
                        value = {rows[3]}
                        target = {word}
                    />
                    <WordleRow
                        isSeptordle = {app.isGameSeptordle}
                        isGuessed = {currentRow > 4}
                        currentRow = {currentRow}
                        currentCell= {currentCell}
                        tabIndex = {tabIndex}
                        value = {rows[4]}
                        target = {word}
                    />
                    <WordleRow
                        isSeptordle = {app.isGameSeptordle}
                        isGuessed = {currentRow > 5}
                        currentRow = {currentRow}
                        currentCell= {currentCell}
                        tabIndex = {tabIndex}
                        value = {rows[5]}
                        target = {word}
                    /> 
                </> 

                {!app.isEndGame ? <VirtualKeyboard  
                    keyboard = {keyboard}
                    target   = {word}
                    value    = {rows}
                    currentRow = {currentRow}
                    onclick  ={onKeyPressHandler} 
                /> : app.isWon ? 
                <> {app.showConfetti ? <Confetti /> : ''}
                    {app.showEndGameToaster ? app.isEndGame ? app.isWon ? <Toaster value={setupWinningText()} /> :  <Toaster value={word} /> : ''  : ''}
                    {app.showStatsModal ? 
                        <StatsModal 
                            isGameStarted          = {app.isGameStarted}
                            showStatsDaily         = {app.showStatsDaily}
                            dailyModeGamesPlayed   = {stats.dailyModeTotalGamesPlayed}
                            dailyModeGamesWon      = {stats.dailyModeTotalGamesWon}
                            dailyModeWinPercentage = {stats.dailyModeWinPercent}
                            dailyModeCurrentStreak = {stats.dailyModeCurrentStreak}
                            dailyModeMaxStreak     = {stats.dailyModeHighestStreak}
                            freeModeGamesPlayed    = {stats.freeModeTotalGamesPlayed}
                            freeModeGamesWon       = {stats.freeModeTotalGamesWon}
                            freeModeWinPercentage  = {stats.freeModeWinPercent}
                            freeModeCurrentStreak  = {stats.freeModeCurrentStreak}
                            freeModeMaxStreak      = {stats.freeModeHighestStreak}
                            onclick                = {onClickHandler}
                        /> : ''}
                    <footer><small>Copyright © 2022 bradley hodge. All Rights Reserved.</small></footer></> : 
                <>
                {app.showEndGameToaster ? app.isEndGame ? <Toaster value={word} /> : ''  : ''}
                    {app.showStatsModal ? 
                        <StatsModal 
                            isGameStarted          = {app.isGameStarted}
                            showStatsDaily         = {app.showStatsDaily}
                            dailyModeGamesPlayed   = {stats.dailyModeTotalGamesPlayed}
                            dailyModeGamesWon      = {stats.dailyModeTotalGamesWon}
                            dailyModeWinPercentage = {stats.dailyModeWinPercent}
                            dailyModeCurrentStreak = {stats.dailyModeCurrentStreak}
                            dailyModeMaxStreak     = {stats.dailyModeHighestStreak}
                            freeModeGamesPlayed    = {stats.freeModeTotalGamesPlayed}
                            freeModeGamesWon       = {stats.freeModeTotalGamesWon}
                            freeModeWinPercentage  = {stats.freeModeWinPercent}
                            freeModeCurrentStreak  = {stats.freeModeCurrentStreak}
                            freeModeMaxStreak      = {stats.freeModeHighestStreak}
                            onclick                = {onClickHandler}
                        /> : ''}
                    <footer><small>Copyright © 2022 bradley hodge. All Rights Reserved.</small></footer>
                </>}
            </>}
        </main>
    )
}