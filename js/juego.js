// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};
var grillacorrecta = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];
// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
	//debugger;
	if(grilla[0][0]==1 && grilla[0][1]==2
		&&grilla[0][2]==3 && grilla[1][0]==4
		&&grilla[1][1]==5 && grilla[1][2]==6
		&&grilla[2][0]==7 && grilla[2][1]==8
		&&grilla[2][2]==9)
		return true;
	return false;
}




// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("CRA, Groso !!!!");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
/*var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

      grilla[fila2][columna2] = pieza1;
      grilla[fila1][columna1] = pieza2;

    var elementoPieza1 = document.getElementById("pieza"+pieza1);
    var elementoPieza2 = document.getElementById("pieza"+pieza2);
    var padre = document.getElementById("juego");

    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
    */


  var pieza1 = grilla[fila1][columna1];
    var pieza2=grilla[fila2][columna2];

      grilla [fila2][columna2] = pieza1;
      grilla [fila1][columna1] = pieza2;
  var elementoPieza1 = document.getElementById("pieza"+pieza1);
  var elementoPieza2 = document.getElementById("pieza"+pieza2);
  var padre = document.getElementById("juego");

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
posicionVacia.fila=nuevaFila;
posicionVacia.columna=nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna)
{

if(fila>2||fila<0||columna>2||columna<0){

  return false;}

return true;
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    // Completar
     nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia 
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      console.log(gano);
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();  
        },500);
      } 
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(2);
  capturarTeclas();
}


iniciar();