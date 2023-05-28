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

const crearJugadores = (name, mark) => {
    return {
        name,
        mark
    }
}

const Juego = (() => {
   let jugadores = [];
   let jugadorActualIndex;
   let gameOver ;

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
    let index = parseInt(event.target.id.split("-")[1]);
        
    if(UI.getBoard()[index] !== "")
    return
    
    UI.update(index, jugadores[jugadorActualIndex].mark);
    jugadorActualIndex = jugadorActualIndex === 0 ? 1 : 0;
   }

   const reiniciar = () => {
    for (let i = 0; i < 9; i++) {
        UI.update(i, "");        
    }
    UI.render();

   }

   return {
    start,
    handleClick,
    reiniciar
   }
})();

const restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", () => {
    Juego.reiniciar();
})

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    Juego.start();
})