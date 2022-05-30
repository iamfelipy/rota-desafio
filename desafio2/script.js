
const body = document.querySelector("body");
const app = document.createElement("div");
app.classList.add("app");
body.appendChild(app);

body.onload = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => { 
            initState.users = json;
            init();
        });
}

const initState = {
    offset: 0,
    limit: 0,
    quantidadeDeDadosPorPagina: 0,
    numeroDePaginas: 0,
    users: [],
    paginaAtual: 0,
    getDataPage() {  
        const users = this.users.slice(this.offset,this.limit);
        return users;
    }
};

function criarMenuDePaginacao() {
    let div = document.createElement("div");
    let paginas = "";
    let c = 0;
    do{
        paginas += `<div class="${initState.paginaAtual == c+1 ? "active" : ""}" onclick="atualizarPagina(${c})">${c+1}</div>`;
        c++;
    }while(c < initState.numeroDePaginas);
    div.innerHTML += `${paginas}`;
    div.classList.add("nav-paginacao");
    app.appendChild(div);
}

function criarPagina() {
    let div = document.createElement("div");
    let data = initState.getDataPage();
    let paginas = "";
    data.forEach((user)=>{
        paginas += `<div class="card">
            <div style="font-weight: bold;">${user.name}</div>
            <div>${user.email}</div>
            <div>${user.phone}</div>
        </div>`;
    });
    div.innerHTML += `${paginas}`;
    div.classList.add("page-data");
    app.appendChild(div);
}

function atualizarPagina(index){
    app.innerHTML = "";
    initState.offset = index * initState.quantidadeDeDadosPorPagina;
    initState.limit = initState.offset + initState.quantidadeDeDadosPorPagina;
    initState.paginaAtual = index+1;

    criarMenuDePaginacao();
    criarPagina();
}

function init() {
    console.log(initState.users);
    initState.quantidadeDeDadosPorPagina = 2;
    initState.numeroDePaginas = Math.ceil(initState.users.length/initState.quantidadeDeDadosPorPagina);
    initState.offset = 0 * initState.quantidadeDeDadosPorPagina;
    initState.limit = initState.offset + initState.quantidadeDeDadosPorPagina;
    initState.paginaAtual = 1;

    criarMenuDePaginacao();
    criarPagina();
};

