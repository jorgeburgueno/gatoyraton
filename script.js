// Render mensaje ganador

const displayController = (() => {
    const renderMensaje = (mensaje) => {
        document.querySelector("#mensaje").innerHTML = mensaje;
    }
    return {
        renderMensaje
    }
  })();
  
  // UI
  const UI = (() => {
  let tablero = ["", "", "", "", "", "", "", "", ""]
  
  const render = () => {
    let boardHTML = "";
    tablero.forEach((cuadro, index) => {
        boardHTML += `<div class ="cuadro" id="cuadro-${index}">${cuadro}</div>`
    })
    document.querySelector("#tablero").innerHTML = boardHTML;
    const cuadros = document.querySelectorAll(".cuadro");
    cuadros.forEach((cuadro) => {
        cuadro.addEventListener("click", Juego.handleClick);
    })
    
  }
  
  const update = (index, value) => {
    tablero[index] = value;
    render()
  }
  
  const getBoard = () => tablero;
  
  return {
    render,
    update,
    getBoard
  }
  })();
  
  //Creacion de nombres de jugadores
  
  const crearJugadores = (name, mark) => {
    return {
        name,
        mark
    }
  }
  
  const Juego = (() => {
   let jugadores = [];
   let jugadorActualIndex;
   let gameOver;
  
   const start = () => {
    jugadores = [
        crearJugadores(document.querySelector("#player1").value, "X"),
        crearJugadores(document.querySelector("#player2").value, "O")
    ]
    jugadorActualIndex = 0;
    gameOver = false;
    UI.render(); 
    const cuadros = document.querySelectorAll(".cuadro");
    cuadros.forEach((cuadro) => {
        cuadro.addEventListener("click", handleClick);
    }) 
  
   }
   const handleClick = (event) => {
    if (gameOver){
        return;
    }
    let index = parseInt(event.target.id.split("-")[1]);
        
    if(UI.getBoard()[index] !== "")
    return;
    
    UI.update(index, jugadores[jugadorActualIndex].mark);
    
    if(checarGanador(UI.getBoard(), jugadores[jugadorActualIndex].mark)){
        gameOver = true;
        displayController.renderMensaje(`${jugadores[jugadorActualIndex].name} gano!`)
    } else if (checarEmpate(UI.getBoard())){
        gameOver = true;
        displayController.renderMensaje( "Empate!")
    }
  
  
    jugadorActualIndex = jugadorActualIndex === 0 ? 1 : 0;
   }
  
   const reiniciar = () => {
    for (let i = 0; i < 9; i++) {
        UI.update(i, "");  
        gameOver= false;  
        document.querySelector("#mensaje").innerHTML = ""; 
    }
    UI.render();
  
   }
  
   return {
    start,
    handleClick,
    reiniciar
   }
  })();
  
  //checa las combinaciones necesarias para ganar
  
  function checarGanador(board) {
    const combinacionGanadora = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < combinacionGanadora.length; i++){
        const [a, b, c] = combinacionGanadora [i];
        if (board[a] && board[a] === board[b] && board[b] ===board[c]){
            return true;
        }
    }
    return false
  }
  
  function checarEmpate(board) {
    return board.every(cell => cell !== "")
  }
  
  //botones de comienzo y reinicio
  
  const restartBtn = document.querySelector("#restart-btn");
  restartBtn.addEventListener("click", () => {
    Juego.reiniciar();
  })
  
  const startBtn = document.querySelector("#start-btn");
  startBtn.addEventListener("click", () => {
    Juego.start();
  })