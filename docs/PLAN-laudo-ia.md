# PLAN - Geração de Laudo por IA

## 1. Visão Geral
**Objetivo:** Criar a interface visual da tela "Geração de Laudo por IA" (AI Report Editor) extraída do Stitch MCP no projeto Angular Tila, sem integrar regras de negócio, funcionalidades ou APIs HTTP, focando estritamente na construção do layout e dos componentes de UI.

## 2. Abordagem Técnica
*   **Apenas UI:** Nenhum service real ou requisição à API será disparado. Os dados (texto do rascunho de IA, informações de imagens, etc.) serão "mockados" através de propriedades locais nos componentes.
*   **Reaproveitamento Angular:** A nova tela reaproveitará o componente padrão de `Sidebar` que inclui os menus primários ("Dashboard", "Pacientes", "Laudos por IA").
*   **Rotas:** A tela será mapeada na rota `/laudo-ia` no arquivo `app.routes.ts`.

---

## 3. Estrutura de Componentes e Breakdown (Tarefas)

### Fase 1: Setup do Componente
- [ ] Criar o componente Angular principal `LaudoIaComponent` (`src/app/pages/laudo-ia`).
- [ ] Integrar a Navbar lateral existente à nova página para garantir consistirência.
- [ ] Registrar a rota `/laudo-ia` no `app.routes.ts` direcionando para o `LaudoIaComponent`.

### Fase 2: Layout da Página (Grid e Estrutura)
- [ ] Determinar o grid geral em Tila (Header de cabeçalho com título "Geração de Laudo por IA").
- [ ] Implementar a tela de layout de 2 colunas:
  - Esquerda: Imagens Médicas & Notas Rápidas.
  - Direita: Rascunho Gerado por IA (Achados, Impressão, Recomendações).

### Fase 3: Detalhamento Visual Mockado
- [ ] **Bloco Imagens Médicas:** Espaço visual para simulação de drag&drop (caixa pontilhada, botão `+`, mock de miniatura de Raio-X).
- [ ] **Bloco Notas Rápidas:** Área de `textarea` ou `input` estruturado para receber contexto que seria repassado à IA, além das opções ("Check-up de Rotina", "Emergência", "Pré-Operatório").
- [ ] **Bloco Rascunho de IA:**
  - Status em verde (ponto luminoso "Pronto").
  - Caixas de categorias: "Achados", "Impressão", e "Recomendações" baseadas no design.
  - Mock da porcentagem de preenchimento ou "Pontuação de Confiança da IA" via barra de progresso.
  - Botões de aprovação/rejeição: `Aprovar e Assinar` (Primário - Azul), `Rejeitar Rascunho` (Outline).

### Fase 4: Avaliação Visual
- [ ] Rodar o projeto angular localmente.
- [ ] Validação visual para assegurar que bate com a página "New AI Report Editor" extraída do projeto Stitch.
- [ ] Usar comando `/web-design-guidelines` (se necessário / solicitado).

---

## 4. Atribuição de Agentes
- `Project-Planner` (Atual): Elaborar e confirmar a estratégia da tela.
- `Frontend-Specialist`: Encarregado pela geração de CSS em linha fina, estilização com Tailwind / CSS regular de acordo com projeto Tila.
- `Orchestrator` / Mão na Massa: Montar os arquivos em Angular e atualizar rotas.

---

## 5. Próximos Passos (User Review Required)
> [!IMPORTANT]
> Verifique se as tarefas acima estão na direção exata que você espera. Faremos estritamente a construção de HTML/CSS e os `.ts` vazios com *mock datas*.

Se o plano estiver aprovado, você me autoriza a criá-lo executando `/create` ou confirmando no chat.
