# Starter · Squad 4 · Expérience

> Hackathon Champions AI4D, dry run du lundi 26 octobre 2026 · volet **Tuile et carte dans l'app**.
> Use case fictif : late check-out à la carte chez Vélora Hôtels (société inventée, données 100 % synthétiques).

## Démarrer

**Sans rien installer (Codespace)** : connectez-vous à GitHub, puis

[![Ouvrir dans GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/zenika-dev/starter-squad-4-experience)

Laissez vides les champs `ANTHROPIC_…`, cliquez sur **Create codespace**, attendez « ✓ Codespace prêt », puis dans le terminal :
`claude auth login` (connexion avec votre compte Claude), et parlez à l'agent depuis l'icône Claude.

**Sur votre poste** : une ligne installe les outils, clone ce dépôt et le contexte partagé dans `hackathon/`, et assemble le contexte.

```powershell
# Windows, dans PowerShell
$env:SQUAD = "squad-4-experience"; irm https://raw.githubusercontent.com/zenika-dev/ai4d-hackathon-kit/main/installation/installer-prerequis.ps1 | iex
```

```bash
# macOS, dans Terminal
curl -fsSL https://raw.githubusercontent.com/zenika-dev/ai4d-hackathon-kit/main/installation/installer-prerequis.sh | bash -s -- squad-4-experience
```

Puis `cd ~/hackathon/starter-squad-4-experience`, `claude auth login` et `claude`.

Pas à pas complet : [fiche de démarrage, section Squad 4](https://github.com/zenika-dev/ai4d-hackathon-kit/blob/main/commun/fiche-demarrage.md#squad-4).

## Ce que contient ce dépôt

| Élément | Rôle |
|---|---|
| `CLAUDE.md` | Consignes de l'agent pour la squad 4 : contexte assemblé, règles de publication, Spec Kit |
| `.devcontainer/` | Environnement Codespace : Node 22, Claude Code, Spec Kit, contexte partagé cloné à côté |
| `.specify/`, `.claude/skills/` | Spec Kit initialisé pour Claude : `/speckit-constitution`, `/speckit-specify`, `/speckit-plan`… |
| `.context/brief.md` | Contexte de la squad, généré par `context-assemble` (non versionné) |
| `src/routes.ts` | La route du volet, **en bouchon** derrière son feature flag : à implémenter avec `/speckit-implement` |
| `src/mocks/` | Mocks des contrats v0 des autres squads, pour avancer sans les attendre |
| `data/` | Données synthétiques : hôtels pilotes, réservations, occupation prévue (montants en centimes) |
| `scripts/` | Flag tracé, déploiement local, observation, scan PCI, gate-check |
| `.github/workflows/ci.yml` | CI : lint, typecheck, tests et couverture, scan PCI et secrets, audit des dépendances |


## Développer

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance l'API en mode développement |
| `npm test` · `npm run test:coverage` | Tests (Vitest), couverture ≥ 70 % (ENG-03) |
| `npm run lint` · `npm run typecheck` | Qualité du code (ENG-01) |
| `npm run scan` | Aucun champ de carte ni secret (SEC-01, SEC-04) |
| `npm run context` | Réassemble `.context/brief.md` depuis le contexte partagé |
| `npm run gate-check -- G1` | Critères automatiques d'une gate, de G1 à G6, à lancer avant chaque créneau |
| `npm run flag -- <flag> on --reason "pourquoi"` | Bascule un flag et la trace dans le journal de la squad (Context Nexus) |
| `npm run deploy` · `npm run observe` | Déploiement local en arrière-plan, puis santé et métriques (G4) |

Le contexte partagé doit être cloné à côté du starter (`../context-nexus`) : c'est automatique en Codespace et avec le script d'installation.

## Liens

- Fiche de la squad : [squads/squad-4-experience/KIT.md](https://github.com/zenika-dev/ai4d-hackathon-kit/blob/main/squads/squad-4-experience/KIT.md)
- Contexte partagé : [ai4d-hackathon-context-nexus](https://github.com/zenika-dev/ai4d-hackathon-context-nexus) · dossier de la squad : [teams/squad-4-experience](https://github.com/zenika-dev/ai4d-hackathon-context-nexus/tree/main/teams/squad-4-experience)
