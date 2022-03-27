import React from 'react';

export default function VirtualKey(props){

    const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: props.isWideButton ? '43px' : '25px',
        height: '50px',

        fontSize: props.value === 'enter' ? '.8rem' : '1rem',
        backgroundColor: props.isGuessed ? props.isRight ? '#6aaa64' : props.isWrongCell ? '#c9b458' : '#787c7e' : '#d3d6da',
        color: props.isGuessed ? '#ffffff' : '#000000',
        textTransform: 'uppercase',
        borderRadius: '5px',
        userSelect: 'none'

        
    }

    return(
        <div className={`btn--keyboard ${props.value}`} onClick={props.onclick} style={styles}>{props.value}</div>
    )
}