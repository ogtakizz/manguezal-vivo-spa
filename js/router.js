import { carregarTemplate } from "./core/templates.js";
import { inicializarCadastro } from "./features/cadastro.js";
import { inicializarProjetos } from "./features/projetos.js";

const app = document.getElementById("app");

// mapeia cada rota ao seu template e a uma função de inicialização opcional
const rotas = {
  "": { template: "home", init: null },
  projetos: { template: "projetos", init: inicializarProjetos },
  cadastro: { template: "cadastro", init: inicializarCadastro },
};

async function renderizarRota() {
  const hashCompleto = window.location.hash.replace("#/", ""); // ex: "projetos?secao=doacoes"
  const [caminho, query] = hashCompleto.split("?");
  const rota = rotas[caminho] || rotas[""];

  app.innerHTML = '<p class="carregando">Carregando...</p>';

  try {
    const html = await carregarTemplate(rota.template);
    app.innerHTML = html;

    if (rota.init) {
      rota.init();
    }

    // lê o parâmetro "secao" da query, se existir, e rola até o elemento
    const parametros = new URLSearchParams(query);
    const secao = parametros.get("secao");

    if (secao) {
      const alvo = document.getElementById(secao);
      if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  } catch (erro) {
    app.innerHTML =
      '<p class="alerta alerta--erro">Não foi possível carregar esta página.</p>';
    console.error(erro);
  }
}

// intercepta cliques em qualquer link interno da aplicação
document.addEventListener("click", (evento) => {
  const link = evento.target.closest("a[data-rota]");
  if (!link) return;

  evento.preventDefault();
  window.location.hash = link.getAttribute("href");

  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.checked = false;
  }

  link.blur();
});

// reage à mudança de hash (clique em link, botão voltar/avançar do navegador)
window.addEventListener("hashchange", renderizarRota);

// primeira renderização, ao carregar a página
window.addEventListener("DOMContentLoaded", renderizarRota);
