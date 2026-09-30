import { aplicarMascaraIMask } from "../utils/mascaras.js";
import { validarFormulario } from "../utils/validacao.js";
import {
  salvarRascunhoCadastro,
  obterRascunhoCadastro,
  limparRascunhoCadastro,
  registrarVoluntario,
} from "../core/storage.js";

function mostrarAlerta(form, tipo, mensagem) {
  form.querySelectorAll(".alerta").forEach((el) => el.remove());

  const alerta = document.createElement("div");
  alerta.className = `alerta alerta--${tipo}`;
  alerta.setAttribute("role", tipo === "erro" ? "alert" : "status");
  alerta.innerHTML = `<span class="alerta__icone">${tipo === "erro" ? "!" : "✓"}</span><p>${mensagem}</p>`;

  form.prepend(alerta);
}

function salvarRascunho(form) {
  salvarRascunhoCadastro(Object.fromEntries(new FormData(form)));
}

function carregarRascunho(form) {
  const dados = obterRascunhoCadastro();
  if (!dados) return;
  Object.entries(dados).forEach(([nome, valor]) => {
    const campo = form.elements[nome];
    if (campo) campo.value = valor;
  });
}

export function inicializarCadastro() {
  const form = document.querySelector("form");
  if (!form) return;

  // aplica as máscaras nos campos que precisam
  aplicarMascaraIMask(form.querySelector("#cpf"), "000.000.000-00");
  aplicarMascaraIMask(form.querySelector("#telefone"), "(00) 00000-0000");
  aplicarMascaraIMask(form.querySelector("#cep"), "00000-000");

  // restaura o que o usuário já tinha digitado, se recarregar a página
  carregarRascunho(form);

  // salva a cada alteração, para não perder contexto em um recarregamento
  form.addEventListener("input", () => salvarRascunho(form));

  // intercepta o envio, valida, e só então "persiste" o cadastro
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const erros = validarFormulario(form);

    if (erros.length > 0) {
      mostrarAlerta(form, "erro", erros.join(" "));
      return;
    }

    const dados = Object.fromEntries(new FormData(form));

    registrarVoluntario(dados);
    limparRascunhoCadastro();

    form.reset();
    mostrarAlerta(
      form,
      "sucesso",
      "Cadastro enviado com sucesso! Em breve entraremos em contato.",
    );
  });
}
