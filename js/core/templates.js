export async function carregarTemplate(nome) {
  const resposta = await fetch(`templates/${nome}.html`);

  if (!resposta.ok) {
    throw new Error(`Template "${nome}" não encontrado`);
  }

  return await resposta.text();
}
