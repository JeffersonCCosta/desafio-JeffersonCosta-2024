class RecintosZoo {
    constructor() {
      this.recintos = [
        {
          numero: 1,
          bioma: "savana",
          tamanhoTotal: 10,
          animaisExistentes: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }],
        },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
        {
          numero: 3,
          bioma: "savana e rio",
          tamanhoTotal: 7,
          animaisExistentes: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }],
        },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
        {
          numero: 5,
          bioma: "savana",
          tamanhoTotal: 9,
          animaisExistentes: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }],
        },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const { tamanho, biomas, carnivoro } = this.animais[animal];
      let recintosViaveis = [];
  
      for (let recinto of this.recintos) {
        const animaisExistentes = recinto.animaisExistentes;
        const espacoOcupado = animaisExistentes.reduce(
          (acc, a) => acc + a.quantidade * a.tamanho,
          0
        );
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
  
        if (
          !biomas.includes(recinto.bioma) &&
          !(recinto.bioma === "savana e rio" && biomas.includes("savana"))
        )
          continue;
  
        const especieExistente = animaisExistentes.find(
          (a) => a.especie === animal
        );
        const espacoNecessario = tamanho * quantidade;
  
        if (espacoNecessario > espacoLivre) continue;
  
        if (
          carnivoro &&
          animaisExistentes.length > 0 &&
          animaisExistentes.some((a) => a.especie !== animal)
        )
          continue;
  
        if (
          animal === "HIPOPOTAMO" &&
          recinto.bioma !== "savana e rio" &&
          animaisExistentes.length > 0
        )
          continue;
  
        if (
          animal === "MACACO" &&
          animaisExistentes.length === 0 &&
          quantidade === 1
        )
          continue;
  
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoLivre - espacoNecessario
          } total: ${recinto.tamanhoTotal})`
        );
      }
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo };  