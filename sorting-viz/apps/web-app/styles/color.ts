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
 
export const getGradientColor = (level:number,contrast=40) => {
    if(level < 1){
        return COLORS.BLOCKED
    }
    // let extraFactor  =level %2 == 0? 50:0;
    // graditent level start from 1 to ... (start from darkest color)
    let r = 0 + level*contrast
    let g = 0  + level*contrast
    let b = 0 + level*contrast

    // r 76 , 121 , 175, 232  // around 50 per l
    // g 0 , 2, 1 , 15 // around 3 per level
    // b 51, 82 ,113 ,136 // around 20 per level

    // 2  4  8  16 32 64 128 256  
    

    
    return `rgb(${r},${g},${b})`;
}