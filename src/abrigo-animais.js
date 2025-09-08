class AbrigoAnimais {

  constructor() {
    this.animais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"],
    };

    this.listaBrinquedos = [
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE"
    ];

  }

encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  // Transformar string em array
  const listaAnimais = ordemAnimais.split(",").map(a => a.trim());

  // Validar animais e duplicatas
  const animaisSet = new Set();
  for (let animal of listaAnimais) {
    if (!this.animais[animal] || animaisSet.has(animal)) {
      return { erro: "Animal inválido", lista: null };
    }
    animaisSet.add(animal);
  }

   // Transformar e validar brinquedos
  const listaPessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
  const listaPessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());

  function validarBrinquedos(listaBrinquedos) {
    const setBrinquedos = new Set();
    for (let brinquedo of listaBrinquedos) {
      if (!this.listaBrinquedos.includes(brinquedo) || setBrinquedos.has(brinquedo)) {
        return false;
      }
      setBrinquedos.add(brinquedo);
    }
    return true;
  }

  if (!validarBrinquedos.call(this, listaPessoa1) || !validarBrinquedos.call(this, listaPessoa2)) {
    return { erro: "Brinquedo inválido", lista: null };
  }

  // Se chegou aqui, animais e brinquedos são válidos
  return { erro: null, lista: listaAnimais };
}

}

export { AbrigoAnimais as AbrigoAnimais };
