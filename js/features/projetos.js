import { projetos } from "./projetos-data.js";

function criarCardHTML(projeto) {
  return `
        <article>
            <h3>${projeto.titulo}</h3>
            <figure>
                <img src="${projeto.imagem}" alt="${projeto.alt}" width="500" height="400">
                <figcaption>${projeto.legenda}</figcaption>
            </figure>
            <p>${projeto.texto}</p>
        </article>
    `;
}

function agruparPorCategoria(lista) {
  return lista.reduce((grupos, item) => {
    (grupos[item.categoria] ??= []).push(item);
    return grupos;
  }, {});
}

export function inicializarProjetos() {
  const container = document.getElementById("o-que-fazemos");
  if (!container) return;

  const grupos = agruparPorCategoria(projetos);

  const html = Object.entries(grupos)
    .map(
      ([categoria, itens]) => `
        <div class="grupo-categoria">
            <p class="grupo-categoria__rotulo">${categoria}</p>
        </div>
        ${itens.map(criarCardHTML).join("")}
    `,
    )
    .join("");

  container.insertAdjacentHTML("beforeend", html);
}
