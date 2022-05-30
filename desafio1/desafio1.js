let path = "a.b.d.1.e";
// let path = "a.b.d[1].e";
// let path = "a.b.d[1].e.f";

let value = { a: { b: { c: 1, d: [1, { e: 2 }] } } };

let padrao = /\w+\[\d\]$/;

// remodelar caminho para funcionar na logica

path = path.split(".");

path = path.map(c => {
  if (padrao.test(c)) {
    let p1 = c.replace(/\[.\]/, "");
    let p2 = c.replace(/.\[/, "").replace("]", "");
    c = [p1, p2];
  }
  return c;
});

// função que percorre o objeto value e retorna o resultado
function get(value1 = "", contador = 0) {
  
  // quando chega no ultimo elemento
  if (contador == path.length) {
    return value1;
  }

  // objeto com array dentro
  if (Array.isArray(path[contador])) {
    let p1 = path[contador][0];
    let p2 = path[contador][1];
    value1 = value1[p1][p2];
    ++contador;
    return get(value1, contador);
  }
  
  // caso não encontre o caminho
  if (value1[path[contador]] == undefined) {
    return undefined;
  }

  value1 = value1[path[contador]];

  ++contador;
  return get(value1, contador);
}

let resultado = JSON.stringify(get(value));

console.log(resultado);
