export const COLORS = {
    PRIMARY: '#818AD8',
    SECONDARY: '#FFCE56',
    SUCCESS: '#4CAF50',
    FAILED: '#F44336',
    WARNING:'yellow',
    INPROGRESS: 'blue',
}

export const getRandomColor = () => {

    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}