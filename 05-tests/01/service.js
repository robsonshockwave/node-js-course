const { get } = require('axios');

const URL = `https://swapi.dev/api/people`;

function mapearPessoas(item) {
  return {
    nome: item.name,
    peso: item.height,
  };
}

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const response = await get(url);
  return response.data.results.map(mapearPessoas);
}

module.exports = { obterPessoas };
