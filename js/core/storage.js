const CHAVE_RASCUNHO = "manguezal-vivo:cadastro-rascunho";
const CHAVE_VOLUNTARIOS = "manguezal-vivo:voluntarios";

export function salvarRascunhoCadastro(dados) {
  localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

export function obterRascunhoCadastro() {
  const salvo = localStorage.getItem(CHAVE_RASCUNHO);
  return salvo ? JSON.parse(salvo) : null;
}

export function limparRascunhoCadastro() {
  localStorage.removeItem(CHAVE_RASCUNHO);
}

export function registrarVoluntario(dados) {
  const listaAtual = JSON.parse(
    localStorage.getItem(CHAVE_VOLUNTARIOS) || "[]",
  );
  listaAtual.push({ ...dados, cadastradoEm: new Date().toISOString() });
  localStorage.setItem(CHAVE_VOLUNTARIOS, JSON.stringify(listaAtual));
}
