// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando der algum problema -> reject(ERRO)
  // quando sucess -> RESOLVE
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      // return reject(new Error('DEU RUIM DE VERDADE!'));

      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '0123456789',
        DDD: 41,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0,
    });
  }, 2000);
}

// 1º passo adicionar a palavra async -> automaticamente ela retornará uma Promise
async function main() {
  try {
    console.time('medida-promise');

    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]); // executa todas as promises em paralelo

    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
            Nome: ${usuario.nome}
            Endereco: ${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.DDD})${telefone.telefone}`);

    console.timeEnd('medida-promise');
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();

// const usuarioPromise = obterUsuario();
// // para manipular o sucesso usamos a função .then
// // para manipular erros, usamos o .catch
// // usuario -> telefone -> telefone
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id,
//         },
//         telefone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.DDD})${resultado.telefone.telefone}`);
//   })
//   .catch(function (error) {
//     console.log('DEU RUIM', error);
//   });

// Famosa Callback Hell
// obterUsuario(function resolverUsuario(error, Usuario) {
//   if (error) {
//     console.log('DEU RUIM em USUARIO', error);
//     return;
//   }

//   obterTelefone(Usuario.id, function resolverTelefone(error1, Telefone) {
//     if (error1) {
//       console.log('DEU RUIM em Telefone', error);
//       return;
//     }

//     obterEndereco(Usuario.id, function resolverEndereco(error2, Endereco) {
//       if (error2) {
//         console.log('DEU RUIM em Endereço', error);
//         return;
//       }

//       console.log(`
//             Nome: ${Usuario.nome},
//             Endereco: ${Endereco.rua}, ${Endereco.numero}
//             Telefone: (${Telefone.DDD})${Telefone.telefone}
//             `);
//     });
//   });
// });
