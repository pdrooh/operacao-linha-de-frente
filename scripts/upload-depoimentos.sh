#!/usr/bin/env bash
# Sobe vídeos e posters otimizados dos depoimentos para o Vercel Blob.
#
# Requer BLOB_READ_WRITE_TOKEN no ambiente (ou em .env.local, via `vercel env pull`).
# Os blobs vão como `public`: a landing page referencia as URLs direto no <video>,
# sem assinatura — URL assinada expira e quebraria a página.
#
#   ./scripts/upload-depoimentos.sh <diretório-com-os-otimizados>

set -euo pipefail

ORIGEM="${1:?informe o diretório com os arquivos otimizados}"
[ -f .env.local ] && set -a && . ./.env.local && set +a
: "${BLOB_READ_WRITE_TOKEN:?BLOB_READ_WRITE_TOKEN não definido}"

# Só os profissionais confirmados na página oficial da DocFounder.
IDS=(
  eline-lobo fabio-strauss wilson-dimartini marcus-bissiguini
  clovisa-reck marcelo-watanabe petterson-guedes daniel-dorta kamilla
)

echo "url,id,tipo"
for id in "${IDS[@]}"; do
  for par in "mp4:depoimentos/$id.mp4:$ORIGEM/otimizados/$id.mp4" \
             "jpg:depoimentos/$id.jpg:$ORIGEM/posters/$id.jpg"; do
    tipo="${par%%:*}"; resto="${par#*:}"
    destino="${resto%%:*}"; arquivo="${resto#*:}"
    [ -f "$arquivo" ] || { echo "faltando: $arquivo" >&2; continue; }
    url=$(vercel blob put "$arquivo" \
            --access public \
            --pathname "$destino" \
            --allow-overwrite true \
            --cache-control-max-age 31536000 \
            --rw-token "$BLOB_READ_WRITE_TOKEN" 2>&1 | grep -oE 'https://[^ ]+' | tail -1)
    echo "$url,$id,$tipo"
  done
done
