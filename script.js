// grid
let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let sol_grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let selected = null;
let wrongCount = 0;
let timerInterval = null;
let seconds = 0;
let currentDifficulty = 'medium';

function countInGrid(num) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === num) count++;
        }
    }
    return count;
}

function updateButtonStates() {
    for (let n = 1; n <= 9; n++) {
        let btn = document.getElementById('button' + n);
        let count = countInGrid(n);
        if (count >= 9) {
            btn.classList.add('disabled');
            if (selected === n) {
                btn.classList.remove('active');
                selected = null;
            }
        } else {
            btn.classList.remove('disabled');
        }
    }
}

// for menu
function for_menu(a) {
    let btn = document.getElementById('button' + a);

    if (btn.classList.contains('disabled')) return;

    if (selected === a) {
        btn.classList.remove('active');
        selected = null;
        highlightgrid();
        return;
    }

    if (selected !== null) {
        document.getElementById('button' + selected).classList.remove('active');
    }

    btn.classList.add('active');
    selected = a;

    highlightgrid();
}

function highlightgrid() {
    document.querySelectorAll('.cells').forEach((cell) => {
        let row = Number(cell.dataset.row) - 1;
        let col = Number(cell.dataset.col) - 1;
        let val = grid[row][col];
        if (selected !== null && val !== 0 && val === selected) {
            cell.classList.add('inUse');
        } else {
            cell.classList.remove('inUse');
        }
    });
}

// vaild 
function vaild(a, b, selected) {
    a = Number(a);
    b = Number(b);
    for (let i = 0; i < 9; i++) {
        if (grid[a - 1][i] == selected && i + 1 != b) return false;
        if (grid[i][b - 1] == selected && i + 1 != a) return false;
    }
    let x = a - 1;
    let y = b - 1;

    let nx = Math.floor(x / 3) * 3;
    let ny = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (nx + i === x && ny + j === y) continue;
            if (grid[nx + i][ny + j] === selected) return false;
        }
    }
    return true;
}

// emptycells
function findEmptyCell() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) return [i, j];
        }
    }
    return null;
}

// generate
function generate() {

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.sort(() => Math.random() - 0.5);

    let pos = findEmptyCell();
    if (pos === null) return true;

    let row = pos[0];
    let col = pos[1];

    for (let i = 0; i < 9; i++) {
        if (vaild(row + 1, col + 1, arr[i])) {

            grid[row][col] = arr[i];

            if (generate()) return true;

            grid[row][col] = 0;
        }
    }

    return false;
}
// render
function render() {
    let cells = document.querySelectorAll(".cells");

    cells.forEach(cell => {
        let row = Number(cell.dataset.row) - 1;
        let col = Number(cell.dataset.col) - 1;

        cell.innerHTML = grid[row][col] === 0 ? "" : grid[row][col];
    });
}
// copy
function copy() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sol_grid[i][j] = grid[i][j];
        }
    }
}

// remove element 

function remove() {
    let removeCount = 36;
    if (currentDifficulty === 'easy') removeCount = 25;
    else if (currentDifficulty === 'medium') removeCount = 36;
    else if (currentDifficulty === 'hard') removeCount = 48;
    else if (currentDifficulty === 'extreme') removeCount = 55;

    for (let i = 0; i < removeCount; i++) {
        let done = false;
        while (!done) {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);

            if (grid[x][y] == 0) {
                continue;
            } else {
                grid[x][y] = 0;
                done = true;
            }
        }
    }
}

function vaildmove(a, b) {
    if (sol_grid[a][b] == selected) {
        return true;
    } else {
        return false;
    }
}

function isdone() {
    let flag = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] != sol_grid[i][j]) {
                flag = false;
            }
        }
    }
    if (flag) {
        stopTimer();
        showToast("Msg from Zinkya :\n Completed Successfully!", "success");
    }
}

function startTimer() {
    seconds = 0;
    stopTimer();
    timerInterval = setInterval(() => {
        seconds++;
        let mm = String(Math.floor(seconds / 60)).padStart(2, '0');
        let ss = String(seconds % 60).padStart(2, '0');
        document.querySelector('.timer').textContent = `Time : ${mm}:${ss}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function showToast(msg, type = 'info') {
    let existing = document.getElementById('sudoku-toast');
    if (existing) existing.remove();

    let toast = document.createElement('div');
    toast.id = 'sudoku-toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: ${type === 'success' ? 'rgb(90,160,90)' : type === 'error' ? 'rgb(200,80,80)' : 'rgb(159,93,0)'};
        color: white; padding: 14px 28px; border-radius: 12px;
        font-family: "Playwrite GB S", cursive; font-size: 1rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.25); z-index: 9999;
        animation: toastIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.4s'; setTimeout(() => toast.remove(), 400); }, 2200);
}

// Reset
function reset() {
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++) {
            grid[i][j] = 0;
            sol_grid[i][j] = 0;
        }

    wrongCount = 0;
    document.querySelector('.wrong').textContent = 'Wrong : 0';
    selected = null;

    for (let n = 1; n <= 9; n++) {
        let btn = document.getElementById('button' + n);
        btn.classList.remove('active', 'disabled');
    }

    document.getElementById('dropdownDiff').classList.remove('open');

    generate();
    render();
    copy();
    remove();
    render();
    markPrefilled();
    updateButtonStates();
    startTimer();
    highlightgrid();
}

function setDifficulty(diff) {
    currentDifficulty = diff;
    document.querySelectorAll('#dropdownDiff .btofnavbar').forEach(el => {
        el.classList.remove('diff-active');
        if (el.dataset.diff === diff) el.classList.add('diff-active');
    });
    document.getElementById('dropdownDiff').classList.remove('open');
    reset();
}

function markPrefilled() {
    document.querySelectorAll(".cells").forEach(cell => {
        let row = Number(cell.dataset.row) - 1;
        let col = Number(cell.dataset.col) - 1;
        if (grid[row][col] !== 0) {
            cell.classList.add('prefilled');
        } else {
            cell.classList.remove('prefilled');
        }
    });
}

// init 
window.onload = () => {
    generate();
    render();
    copy();
    remove();
    render();
    markPrefilled();
    updateButtonStates();
    startTimer();

    let gridEl = document.querySelector('.grid');
    gridEl.addEventListener('click', (e) => {
        let cell = e.target.closest('.cells');
        if (!cell) return;

        let row = Number(cell.dataset.row);
        let col = Number(cell.dataset.col);

        if (selected === null) {
            showToast("Msg from Zinkya : Select a number first");
            return;
        }
        if (cell.classList.contains('prefilled')) return;

        if (vaildmove(row - 1, col - 1)) {
            grid[row - 1][col - 1] = selected;
            cell.textContent = selected;
            cell.classList.add('just-placed');
            setTimeout(() => cell.classList.remove('just-placed'), 400);
            updateButtonStates();
            highlightgrid();
        } else {
            wrongCount++;
            document.querySelector('.wrong').textContent = `Wrong : ${wrongCount}`;
            cell.classList.add('shake');
            setTimeout(() => cell.classList.remove('shake'), 400);
        }
        isdone();
    });

    let diffBtn = document.getElementById('diffBtn');
    let dropdown = document.getElementById('dropdownDiff');
    diffBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    dropdown.addEventListener('click', e => e.stopPropagation());

    document.querySelectorAll('#dropdownDiff .btofnavbar').forEach(el => {
        el.addEventListener('click', () => setDifficulty(el.dataset.diff));
    });

    let modeBtn = document.getElementById('modeBtn');
    modeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        modeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light' : 'Dark';
    });
};