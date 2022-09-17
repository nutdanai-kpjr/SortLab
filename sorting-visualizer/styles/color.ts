export const COLORS = {
    DEFAULT: '#818AD8',
    COMPARE: '#FFCE56',
    SORTED: '#4CAF50',
    FREE1: '#30C9AF',
    FREE2:'#EA534E',
    SPECIAL: '#318BC8',
    INACTIVE:'#dddddd',
    BLOCKED: '#555555',
    
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