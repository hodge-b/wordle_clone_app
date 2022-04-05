import React from 'react';

export default function StatsModal(props){

    const buttonActiveStyle = {
        borderTop: '2px solid #6aaa64',
        borderLeft: '2px solid #6aaa64',
        borderRight: '2px solid #6aaa64',
        borderBottom: 'none',
        top: '.21rem'
    }
    const buttonStyle = {
        borderTop: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000',
        borderBottom: 'none',
        top: '.11rem'
    }

    return(
        <div className="stats-modal">
            <h2 className="stats-title">Statistics</h2>
            <div className="stats-button-container">
                <button className="btn btn--daily-stats btn-stats" onClick={props.onclick} style={props.showStatsDaily ? buttonActiveStyle : buttonStyle}>daily</button>
                <button className="btn btn--free-stats btn-stats" onClick={props.onclick} style={!props.showStatsDaily ? buttonActiveStyle : buttonStyle}>free</button>
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