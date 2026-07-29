# Discipulado Desbravadores

Plataforma para disponibilizar materiais (PDF, imagem, vídeo) para download, com um
formulário de acesso e uma tela de feedback. Construída em Next.js + Supabase, feita
para rodar na Vercel.

## 1. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto (gratuito).
2. Vá em **SQL Editor** → **New query**, cole o conteúdo do arquivo
   `supabase/schema.sql` deste projeto e clique em **Run**.
   Isso cria as tabelas de categorias, arquivos, respostas de acesso e feedback,
   além do bucket de armazenamento `materiais`.
3. Vá em **Project Settings → API** e copie:
   - `Project URL` → vai virar `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → vai virar `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Configurar as variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha com os valores do passo 1.

Na Vercel, adicione as mesmas duas variáveis em **Project Settings → Environment Variables**.

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## 4. Como adicionar novos arquivos (PDF, imagem, vídeo)

Você pode pedir para o Claude fazer isso por você pelo chat (ex: "adicione este PDF na
aba Bom de Bíblia > 2026 - Daniel"), ou fazer manualmente:

1. No painel do Supabase, vá em **Storage → materiais** e faça upload do arquivo.
2. Copie a URL pública do arquivo (clique nos "..." → Copy URL).
3. Vá em **Table Editor → files** e insira uma nova linha:
   - `category_id`: copie o `id` da categoria correspondente (veja na tabela `categories`)
   - `title`: título que aparece no card
   - `description`: texto opcional abaixo do título
   - `file_type`: `pdf`, `imagem` ou `video`
   - `storage_path`: caminho do arquivo dentro do bucket
   - `file_url`: a URL pública copiada no passo 2
   - `sort_order`: número para ordenar (menor aparece primeiro)

## 5. Estrutura de abas já criada

- **Bom de Bíblia**: 2026 - Daniel, 2026 - Apocalipse
- **Classes em figurinhas**: Amigo
- **Clube de leitura**: Pela Graça de Deus
- **Manuais oficiais**: Uniformes, Manual Administrativo

Para adicionar uma nova aba/subaba, insira uma linha na tabela `categories`
(`parent_id` nulo = aba principal, preenchido = subaba) e crie a pasta correspondente
em `src/app/<aba>/<subaba>/page.tsx` (peça ao Claude para gerar isso automaticamente).

## 6. Respostas dos formulários

Ficam nas tabelas `access_responses` (quem acessou a plataforma) e
`feedback_responses` (feedback e sugestões). Veja e exporte pelo **Table Editor**
do Supabase (botão "Export" gera um CSV que abre direto no Excel/Sheets).

## 7. Deploy na Vercel

1. Suba este repositório no GitHub.
2. Em [vercel.com](https://vercel.com), clique em **New Project** e importe o repositório.
3. Adicione as variáveis de ambiente (passo 2).
4. Deploy. Depois, configure o domínio `discipulado.desbravadores.com` em
   **Project Settings → Domains**, apontando o DNS conforme instruído pela Vercel.
