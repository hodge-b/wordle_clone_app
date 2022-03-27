import React from 'react';

export default function WordleCell(props){
    
    const styles ={
        backgroundColor: props.isGuessed ? props.isRight ? '#6aaa64': props.isWrongCell ? '#c9b458' : '#787c7e' : '#ffffff',
        color: props.isGuessed ? '#ffffff' : '#000000',
        border: props.isGuessed ? props.isRight ? '2px solid #6aaa64' : props.isWrongCell ? '2px solid #c9b458' : '2px solid #787c7e' : '2px solid #d3d6da',
        borderRadius: '5px'
    }

    return(
        <div 
            className="wordle-cell"
            style={styles}
        >{props.value}</div>
    )
}