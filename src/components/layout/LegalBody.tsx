/**
 * Tipografia de documento legal. Usa a serifada de leitura e réguas de latão
 * entre seções — mesmo sistema da landing, densidade de documento.
 */
export function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-body">{children}</div>
  );
}

/**
 * Marca, de forma visível, cada informação que depende do cliente. Nada é
 * inventado para preencher um documento jurídico.
 */
export function LegalPending({ children }: { children: React.ReactNode }) {
  return (
    <p className="legal-pending" role="note">
      <span className="t-label text-brass-deep">Pendente do cliente</span>
      <span>{children}</span>
    </p>
  );
}
