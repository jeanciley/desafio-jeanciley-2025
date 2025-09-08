import { AbrigoAnimais } from "./abrigo-animais.js";

const abrigo = new AbrigoAnimais();

// ✅ Teste válido
console.log(
  abrigo.encontraPessoas("RATO,BOLA,LASER", "CAIXA,NOVELO", "Rex, Mimi, Bola")
);
// Esperado: { erro: null, lista: [ 'Rex', 'Mimi', 'Bola' ] }

// ❌ Teste com animal inválido
console.log(
  abrigo.encontraPessoas("RATO,BOLA", "CAIXA,NOVELO", "Rex, Pikachu")
);
// Esperado: { erro: "Animal inválido", lista: null }

// ❌ Teste com brinquedo inválido
console.log(
  abrigo.encontraPessoas("RATO,FOGUETE", "CAIXA,NOVELO", "Rex, Mimi")
);
// Esperado: { erro: "Brinquedo inválido", lista: null }

// ❌ Teste com brinquedo repetido
console.log(
  abrigo.encontraPessoas("RATO,RATO", "CAIXA,NOVELO", "Rex, Mimi")
);
// Esperado: { erro: "Brinquedo inválido", lista: null }
