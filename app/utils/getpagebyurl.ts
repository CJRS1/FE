const getpagebyurl = (url : string) => {
    if (url === '/usuario') {
      return 'Usuario';
    } else if (url === '/sale') {
      return 'Venta';
    } else {
      return 'Desconocido'; // Otra opción si la URL no coincide con ninguna ruta esperada
    }
  };
  
  export default getpagebyurl;
  