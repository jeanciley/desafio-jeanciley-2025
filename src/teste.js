import { AbrigoAnimais } from "./abrigo-animais.js";

const abrigo = new AbrigoAnimais();

// Pessoa 1 consegue atender vários animais seguidos
console.log("Teste limite pessoa 1:");
console.log(
  abrigo.encontraPessoas(
    "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE", // Pessoa 1 tem tudo
    "RATO",                               // Pessoa 2 quase nada
    "Rex,Mimi,Fofo,Bola"                  // 4 animais na ordem
  )
);
// Esperado:
// Rex  -> pessoa 1
// Mimi -> pessoa 1
// Fofo -> pessoa 1
// Bola -> abrigo  (porque pessoa 1 já tem 3)


// Agora o mesmo para a pessoa 2
console.log("\nTeste limite pessoa 2:");
console.log(
  abrigo.encontraPessoas(
    "RATO",                               // Pessoa 1 quase nada
    "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE", // Pessoa 2 tem tudo
    "Rex,Mimi,Fofo,Bola"                  // 4 animais na ordem
  )
);
// Esperado:
// Rex  -> pessoa 2
// Mimi -> pessoa 2
// Fofo -> pessoa 2
// Bola -> abrigo  (porque pessoa 2 já tem 3)
