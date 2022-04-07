import React from 'react';

export default function StatsModal(props){

    
    return(
        <div className="stats-modal">
            <h2 className="stats-title">Statistics</h2>
            <div className="stats-button-container">
                <button className={props.showStatsDaily ? "btn btn--daily-stats btn-stats btn--stats-active" : "btn btn--daily-stats btn-stats btn--stats-inactive"} onClick={props.onclick}>daily</button>
                <button className={!props.showStatsDaily ? "btn btn--free-stats btn-stats btn--stats-active" : "btn btn--free-stats btn-stats btn--stats-inactive"} onClick={props.onclick}>free</button>
            </div>
            <div className="stats-container">
                <div className="stats-row"> 
                    <div className="stats-item">
                        <div className="stats-item--value">{props.showStatsDaily ? props.dailyModeGamesPlayed : props.freeModeGamesPlayed}</div>
                        <div className="stats-item--sub-title">Played</div>
                    </div>
                    <div className="stats-item">
                        <div className="stats-item--value">{props.showStatsDaily ? props.dailyModeWinPercentage : props.freeModeWinPercentage}%</div>
                        <div className="stats-item--sub-title">Win percent</div>
                    </div>
                </div>
                    <div className="stats-row">
                    <div className="stats-item">
                        <div className="stats-item--value">{props.showStatsDaily ? props.dailyModeCurrentStreak : props.freeModeCurrentStreak}</div>
                        <div className="stats-item--sub-title">streak</div>
                    </div>
                    <div className="stats-item">
                        <div className="stats-item--value">{props.showStatsDaily ? props.dailyModeMaxStreak : props.freeModeMaxStreak}</div>
                        <div className="stats-item--sub-title">max streak</div>
                    </div>
                </div>
            </div>
            {props.isGameStarted ?
            <>
                <button className="btn btn--back" onClick={props.onclick}>X</button>
                <button className='btn btn--menu' onClick={props.onclick}>Main menu</button> 
            </>
            :
                <button className="btn btn--back" onClick={props.onclick}>X</button>}
        </div>
    )
}