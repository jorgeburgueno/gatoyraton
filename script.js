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
  

  return {
    render,
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
   }
   const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    alert(index)
   }

   return {
    start,
    handleClick
   }
})();

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    Juego.start();
})