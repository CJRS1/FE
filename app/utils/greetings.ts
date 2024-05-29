// Función para determinar el saludo según la hora
export default function greetings(hora : number) {
  let saludo : string;

  if (hora >= 6 && hora < 12) {
    saludo = 'Buenos días';
  } else if (hora >= 12 && hora < 18) {
    saludo = 'Buenas tardes';
  } else {
    saludo = 'Buenas noches';
  }

  return saludo;
}
