export const COLORS = {
    PRIMARY: '#818AD8',
    SECONDARY: '#FFCE56',
    SUCCESS: '#4CAF50',
    FAILED: '#F44336',
    WARNING:'yellow',
    INPROGRESS: 'blue',
    INACTIVE:'grey'
}

export const getRandomColor = () => {

    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

export const getRGBAColorWIthOpacity = (r:number,g:number,b:number, opacity:number) => {
    let newOpacity = opacity;
    if(opacity > 1){
        newOpacity = 1;
    }
    else if(opacity < 0){
        newOpacity = 0;
    }

    
    return `rgba(${r},${g},${b},${newOpacity})`;
}