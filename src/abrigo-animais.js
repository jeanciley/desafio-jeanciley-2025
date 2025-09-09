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

// 🔹 Função auxiliar: verifica se a pessoa consegue atender a ordem de brinquedos do animal
  consegueAtender(listaPessoa, ordemAnimal) {
    let indiceAnimal = 0; // posição atual na ordem do animal
    for (let brinquedo of listaPessoa) {
      if (brinquedo === ordemAnimal[indiceAnimal]) {
        indiceAnimal++; // achou o brinquedo esperado, avança
      }
      if (indiceAnimal === ordemAnimal.length) {
        return true; // já encontrou todos os brinquedos na ordem
      }
    }
    return false; // terminou sem conseguir a ordem completa
  }

  // Nova função: atribui cada animal a quem consegue atender (Pessoa 1, Pessoa 2 ou Nenhuma)
  atribuirAnimais(ordemAnimaisArray, listaPessoa1, listaPessoa2) {
    const atribuicoes = {}; // vai mapear animal -> "Pessoa 1" | "Pessoa 2" | "Nenhuma"
    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;

    for (let animal of ordemAnimaisArray) {
      const favoritos = this.animais[animal]; // brinquedos favoritos, em ordem

      // reaproveita a função auxiliar já existente
      const pessoa1Consegue = this.consegueAtender(listaPessoa1, favoritos);
      const pessoa2Consegue = this.consegueAtender(listaPessoa2, favoritos);

      if (pessoa1Consegue && !pessoa2Consegue) {
        atribuicoes[animal] = "Pessoa 1";
      } else if (!pessoa1Consegue && pessoa2Consegue) {
        atribuicoes[animal] = "Pessoa 2";
      } else {
        // aqui entram dois casos: nenhum consegue OU ambos conseguem.
        // por enquanto tratamos ambos como "Nenhuma" (vai pro abrigo / empate).
        atribuicoes[animal] = "Nenhuma";
      }
    }

    return atribuicoes;
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

    // ---- usa a nova função para obter quem pode levar cada animal ----
    const atribuicoes = this.atribuirAnimais(listaAnimais, listaPessoa1, listaPessoa2);

    // converte o mapa de atribuições para o formato requerido: "Nome - pessoa X" ou "Nome - abrigo"
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
