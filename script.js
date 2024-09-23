const board = document.getElementById('board');
        const status = document.getElementById('status');
        const resetBtn = document.getElementById('reset');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }

        function handleCellClick(e) {
            const index = e.target.getAttribute('data-index');
            if (gameBoard[index] === '' && gameActive) {
                gameBoard[index] = currentPlayer;
                e.target.textContent = currentPlayer;
                if (checkWin()) {
                    status.textContent = `Player ${currentPlayer} wins!`;
                    gameActive = false;
                } else if (gameBoard.every(cell => cell !== '')) {
                    status.textContent = "It's a draw!";
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    status.textContent = `Player ${currentPlayer}'s turn`;
                }
            }
        }

        function checkWin() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        function resetGame() {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        }

        createBoard();
        resetBtn.addEventListener('click', resetGame);
        status.textContent = `Player ${currentPlayer}'s turn`;