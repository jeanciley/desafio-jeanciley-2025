class AbrigoAnimais {

  constructor() {
    this.animais = {
      Rex: { especie: "cão", favoritos: ["RATO", "BOLA"] },
      Mimi: { especie: "gato", favoritos: ["BOLA", "LASER"] },
      Fofo: { especie: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
      Zero: { especie: "gato", favoritos: ["RATO", "BOLA"] },
      Bola: { especie: "cão", favoritos: ["CAIXA", "NOVELO"] },
      Bebe: { especie: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
      Loco: { especie: "jabuti", favoritos: ["SKATE", "RATO"] },
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

  // 🔹 Funções auxiliares 🔹
  mostraTodosNaOrdem(seqPessoa, favoritos) {
    let i = 0;
    for (let brinquedo of seqPessoa) {
      if (i < favoritos.length && brinquedo === favoritos[i]) i++;
    }
    return i === favoritos.length;
  }

  mostraTodosIgnorandoOrdem(seqPessoa, favoritos) {
    const cont = new Map();
    for (let b of seqPessoa) cont.set(b, (cont.get(b) || 0) + 1);
    for (let fav of favoritos) {
      const q = cont.get(fav) || 0;
      if (q <= 0) return false;
      cont.set(fav, q - 1);
    }
    return true;
  }

  podeAdotar(animalNome, listaPessoa) {
    const animal = this.animais[animalNome];
    if (!animal) return false;

    // Loco (jabuti) ignora ordem
    if (animal.especie === "jabuti") {
      return this.mostraTodosIgnorandoOrdem(listaPessoa, animal.favoritos);
    }
    return this.mostraTodosNaOrdem(listaPessoa, animal.favoritos);
  }

  // 🔹 Função que atribui cada animal a quem consegue atender 🔹
  atribuirAnimais(ordemAnimaisArray, listaPessoa1, listaPessoa2) {
  const atribuicoes = {};
  const adotadosPessoa1 = [];
  const adotadosPessoa2 = [];

  // Primeiro processa todos os animais que não são Loco
  for (let animal of ordemAnimaisArray) {
    if (animal === "Loco") continue;

    const pessoa1Consegue = this.podeAdotar(animal, listaPessoa1);
    const pessoa2Consegue = this.podeAdotar(animal, listaPessoa2);

    let dono = "Abrigo";

    if (pessoa1Consegue && !pessoa2Consegue) dono = "Pessoa 1";
    else if (!pessoa1Consegue && pessoa2Consegue) dono = "Pessoa 2";

    // Empates ou ninguém consegue -> Abrigo (Regra 4 já implícita)

    // Regra 5: limite de 3 animais por pessoa
    if (dono === "Pessoa 1" && adotadosPessoa1.length >= 3) dono = "Abrigo";
    if (dono === "Pessoa 2" && adotadosPessoa2.length >= 3) dono = "Abrigo";

    atribuicoes[animal] = dono;

    if (dono === "Pessoa 1") adotadosPessoa1.push(animal);
    if (dono === "Pessoa 2") adotadosPessoa2.push(animal);
  }

  // Agora processa Loco (Regra 6)
  if (ordemAnimaisArray.includes("Loco")) {
    const pessoa1Consegue = this.podeAdotar("Loco", listaPessoa1);
    const pessoa2Consegue = this.podeAdotar("Loco", listaPessoa2);

    let dono = "Abrigo";

    if (pessoa1Consegue && adotadosPessoa1.length >= 1 && adotadosPessoa1.length < 3) {
      dono = "Pessoa 1";
      adotadosPessoa1.push("Loco");
    } else if (pessoa2Consegue && adotadosPessoa2.length >= 1 && adotadosPessoa2.length < 3) {
      dono = "Pessoa 2";
      adotadosPessoa2.push("Loco");
    }

    atribuicoes["Loco"] = dono;
  }
    return atribuicoes;
  }

  // 🔹 Função principal 🔹
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaAnimais = ordemAnimais.split(",").map(a => a.trim());

    const animaisSet = new Set();
    for (let animal of listaAnimais) {
      if (!this.animais[animal] || animaisSet.has(animal)) {
        return { erro: "Animal inválido", lista: null };
      }
      animaisSet.add(animal);
    }

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

    const atribuicoes = this.atribuirAnimais(listaAnimais, listaPessoa1, listaPessoa2);

    const resultado = listaAnimais.map(animal => {
      const dono = atribuicoes[animal];
      if (dono === "Pessoa 1") return `${animal} - pessoa 1`;
      if (dono === "Pessoa 2") return `${animal} - pessoa 2`;
      return `${animal} - abrigo`;
    });

    return { erro: null, lista: resultado };
  }

}

export { AbrigoAnimais as AbrigoAnimais };
