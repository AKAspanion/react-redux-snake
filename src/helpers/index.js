export const createGrid = (size) =>{
    const grid = []

    for (let row = 0; row < size; row++) {
        const cols = [];
        for (let col = 0; col < size; col++) {
            cols.push({
            row,
            col
            });
        }
        grid.push(cols);
    }
    return grid
}