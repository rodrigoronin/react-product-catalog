# 🎮 GDD – Projeto: [Título Provisório]
*(Pixel ARPG Top-Down inspirado em SAO, HLD e Ragnarok)*

---

## 1. Visão Geral

**Gênero:** Action RPG / Dungeon Crawler  
**Estilo Visual:** Pixel Art top-down (inspirado em Hyper Light Drifter, Eastward, Zelda GB)  
**Plataformas Alvo:** PC (Windows/Linux), com escalabilidade futura para consoles  

**Pilares do Jogo:**
1. **Exploração e Risco** – entrar em dungeons/towers, decidir até onde avançar antes de recuar.  
2. **Combate Ágil e Estratégico** – movimentação livre, dashes, cooldowns e leitura de padrões de inimigos.  
3. **Progressão e Customização** – crescimento via atributos e equipamentos (sem classes fixas).  
4. **Recompensa pela Coragem** – quanto mais fundo o jogador for, maior o loot, XP e chance de itens raros.  

---

## 2. Loop Principal de Jogo

O jogo gira em torno de um **ciclo de progressão e risco-recompensa**, inspirado em Sword Art Online, Hades e Ragnarok Online:

```text
[CIDADE/BASE] → [PREPARAÇÃO] → [DUNGEON/TORRE] → [COMBATE & FARM] → [CHEFE/FUGA] → [RETORNO À BASE]
```

### Etapas:

1. **Cidade/Base:**
   - Comprar suprimentos, poções e reforjar equipamentos.  
   - Interagir com NPCs (mercador, ferreiro, tutores de habilidades).  
   - Distribuir pontos de status e aprender novas skills.  

2. **Dungeon/Torre:**
   - Gerada proceduralmente (ou semi-procedural no protótipo).  
   - Cada andar aumenta a dificuldade e qualidade do loot.  
   - O jogador pode sair a qualquer momento (mas perderá parte dos drops se morrer).  

3. **Combate:**
   - **Movimentação livre 8 direções.**  
   - **Ataques rápidos + cooldowns curtos.**  
   - **Dash**, **parry**, **skills ativas e passivas**.  
   - Equipamentos alteram velocidade, defesa e cast time.  

4. **Progressão:**
   - XP → Level → Pontos de Atributo.  
   - Encantamento e upgrades de armas/armaduras.  
   - Escolha livre de builds e estilos (sem classes fixas).  

5. **Retorno à Base:**
   - Conversão de loot em ouro e materiais.  
   - Desbloqueio de novas áreas, NPCs e upgrades de vila.  
   - Recomeço do ciclo com mais poder e novos desafios.  

---

## 2. Mecânicas Centrais e Progressão

### 2.1 Atributos e Status

O jogador evolui de nível e distribui pontos entre **atributos-base**:

| Atributo | Efeito Principal | Influência Secundária |
|-----------|------------------|------------------------|
| **STR** (Força) | Aumenta dano físico e carga de equipamento | Melhora resistência a stagger |
| **DEX** (Destreza) | Aumenta velocidade de ataque e precisão | Reduz tempo de recarga de habilidades físicas |
| **INT** (Inteligência) | Aumenta dano mágico | Reduz cast time |
| **VIT** (Vitalidade) | Aumenta HP e defesa física | Aumenta regeneração natural |
| **SPI** (Espírito) | Aumenta mana e resistência mágica | Aumenta duração de buffs |

---

### 2.2 Disciplinas (sistema de aprendizado de habilidades)

Em vez de classes fixas, o jogador aprende **Disciplinas** com **NPCs tutores** espalhados pelo mundo.

Cada Disciplina tem:
- Um **tema** (ex: Pyromancer, Swordmaster, Guardian, etc.),
- Um **caminho de progressão interno** (pequena árvore de 3 a 5 habilidades),
- **Requisitos de atributos** e **custo em pontos de técnica (TP)** para evoluir.

Exemplo:

**Disciplina: Pyromancer**
| Habilidade | Descrição | Requisitos | Custo TP |
|-------------|------------|-------------|-----------|
| **Firewall** | Cria uma linha de fogo que causa dano contínuo. | INT 10 | 1 |
| **Flame Shield** | Escudo de fogo que reduz dano físico e reflete parte do dano. | Firewall Nv.3 | 2 |
| **Inferno** | Invoca uma explosão massiva em área. | Flame Shield Nv.2, INT 20 | 3 |

- Ao aprender uma Disciplina, o jogador desbloqueia **a primeira habilidade** e pode evoluí-la gastando TP.  
- Ao evoluir as habilidades, **novas ramificações** da árvore se abrem automaticamente.  
- NPCs mais avançados podem **expandir uma Disciplina existente** (ex: “Pyromancer Avançado” adiciona novas skills).

---

### 2.3 Pontos de Técnica (TP)

- Ganhos ao subir de nível ou realizar marcos (ex: derrotar chefes).  
- Usados para desbloquear ou evoluir habilidades em Disciplinas.  
- Reset possível via item raro ou NPC especializado.

---

### 2.4 Sinergias e Equipamentos

- Armas e armaduras **potencializam certas Disciplinas** (ex: Cajado de Fogo aumenta poder de Pyromancer).  
- Equipamentos têm **níveis de encantamento** (até +10, por exemplo), que ampliam bônus e efeitos visuais.

---

## 3. Combate e Gameplay Moment-to-Moment

### 3.1 Filosofia de Combate

O combate é **rápido, fluido e reativo**, com ênfase em **posicionamento, leitura de padrões e timing de habilidades**.  

---

### 3.2 Fundamentos do Combate

| Elemento | Descrição |
|-----------|------------|
| **Movimentação** | Livre em 8 direções |
| **Ataque básico** | Combos curtos, escalando com atributos |
| **Dash / Dodge** | Movimento instantâneo com i-frames curtos |
| **Skills Ativas** | Consomem mana, entram em cooldown |
| **Skills Passivas** | Modificam atributos ou habilidades |
| **Interação** | Abrir baús, coletar loot, etc. |

---

### 3.3 Recursos e Cooldowns

| Recurso | Função | Regeneração |
|----------|---------|-------------|
| **HP** | Vida | Poções e skills |
| **Mana (MP)** | Skills ativas | Regenera fora de combate |
| **Cooldowns** | Controlam ritmo do combate | - |

---

### 3.4 Tipos de Armas e Estilos

| Tipo | Alcance | Velocidade | Escalonamento | Estilo |
|------|----------|-------------|----------------|--------|
| **Espadas Curtas** | Curto | Alta | STR/DEX | Versátil |
| **Lanças** | Médio | Média | STR | Controle |
| **Machados** | Curto | Lento | STR | Alto dano |
| **Arcos** | Longo | Média | DEX | Distância |
| **Cajados** | Longo | Lento | INT | Mágico |
| **Adagas** | Curto | Muito Alta | DEX | Crítico |

---

## 4. Estrutura de Progressão e Economia

*(Conteúdo completo conforme definido nas mensagens anteriores, incluindo loot, forja, economia e vila)*

---

## 5. Estrutura da Dungeon / Torre (Andar 1)

*(Conteúdo completo com layout modular, inimigos e boss Pyre Warden)*

---

## 6. Estrutura Técnica e Arquitetura do Protótipo

*(Conteúdo completo conforme definido, com TypeScript, Pixi.js, Tauri e ECS)*
