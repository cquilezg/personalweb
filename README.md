# Personal Web — Natalia Alcaraz

Sitio web de Natalia Alcaraz, psicóloga perinatal e infantil. Construido con Astro y Tailwind CSS, y desplegado en Railway.

## Stack

- Astro 5
- Tailwind CSS 4
- TypeScript
- Node.js 22
- npm

## Desarrollo local

Requisitos: Node.js 22 y npm.

```bash
npm ci
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ en local
```

Actualmente no hay suite de tests automatizada. El CI valida que el proyecto compila.

## Estructura del proyecto

```text
.
├── .github/workflows/
│   ├── ci.yml          # Build y Version guard
│   └── release.yml     # release-please, tag y artefactos
├── public/             # estáticos
├── src/
│   ├── assets/         # imágenes procesadas por Astro
│   ├── components/     # Header, Footer, etc.
│   ├── layouts/        # Layout base
│   ├── pages/          # rutas del sitio
│   └── styles/         # Tailwind y estilos globales
├── release-please-config.json
├── .release-please-manifest.json
├── astro.config.mjs
└── package.json
```

## Flujo de desarrollo

Se usa un GitFlow simplificado:

- `main`: producción. Solo recibe merges desde `develop` mediante PR.
- `develop`: integración. Solo recibe PRs de ramas de trabajo.
- `feature/*`: nuevas funcionalidades.
- `fix/*`: correcciones.
- `docs/*`: documentación.
- `chore/*`: mantenimiento y configuración.

### Reglas de ramas

- Nunca se hace push directo a `main` ni a `develop`.
- Todo cambio entra por PR.
- `main` y `develop` exigen commits firmados.
- Los required checks son `Build` y `Version guard`.
- Métodos de merge permitidos: merge commit y squash. Rebase está deshabilitado porque reescribe commits y rompe la verificación de firmas.
- Para promociones `develop → main` y para PRs apiladas, usar **merge commit**. Para una PR simple a `develop`, squash es aceptable.

### Commits

Se usan Conventional Commits:

```text
feat: nueva funcionalidad
fix: corrección
docs: documentación
ci: cambios de CI
chore: mantenimiento
refactor: refactor sin cambio de comportamiento
```

Los commits deben estar firmados. Configuración SSH recomendada:

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

La clave pública debe estar registrada en GitHub como **SSH signing key**.

## CI

El workflow `.github/workflows/ci.yml` se ejecuta en `push` y `pull_request` contra `main` y `develop`.

Jobs:

- `Build`: `npm ci` + `npm run build`.
- `Version guard`: en PRs a `develop`, falla si cambia la versión de `package.json` respecto a la rama base.

La versión no se toca en PRs a `develop`. Se gestiona únicamente en `main` mediante release-please.

## Releases

Se usa [release-please](https://github.com/googleapis/release-please) para calcular la siguiente versión, generar el `CHANGELOG.md` y crear el tag y el GitHub Release.

Configuración:

- `release-please-config.json`: `release-type: node`, versión inicial `0.1.0`, tags con prefijo `v`.
- `.release-please-manifest.json`: última versión liberada. Empieza en `0.0.0`.
- `.github/workflows/release.yml`: se ejecuta en `push` a `main`.

### Requisitos de release-please

- El workflow de release debe tener el permiso `issues: write`.
- Deben existir los labels `autorelease: pending` y `autorelease: tagged`.
- En GitHub: **Settings → Actions → General → Workflow permissions**, la opción **Allow GitHub Actions to create and approve pull requests** debe estar activada.
- No cambiar `package.json` ni `package-lock.json` en PRs a `develop`.
- No crear tags manualmente.

release-please usa los labels como estado del release. Si el label `autorelease: pending` no está en la PR de release al mergearla, release-please no detecta el release y vuelve a abrir otra PR en lugar de crear el tag.

### Flujo de release

1. Mergear las features a `develop`.
2. Abrir una PR `develop → main` y mergearla con **merge commit**.
   - Railway despliega el commit de promoción.
   - El workflow `Release` ejecuta release-please.
   - release-please abre una PR de release contra `main`, etiquetada `autorelease: pending`, con el `CHANGELOG.md` y el manifiesto actualizados. **Todavía no crea el tag.**
3. Revisar la PR de release y mergearla con **merge commit**.
   - release-please crea el tag `vX.Y.Z` y el GitHub Release.
   - El label cambia a `autorelease: tagged`.
   - El workflow hace checkout del tag, compila, genera `dist-vX.Y.Z.zip` y `dist-vX.Y.Z.zip.sha256`, y los sube al Release.
   - Railway despliega el commit del release.
4. Verificar el tag, los assets y el deployment.

### Comandos útiles

```bash
# Buscar la PR de release pendiente
gh pr list --base main --label "autorelease: pending"

# Ver la release y sus assets
gh release view v0.1.0
gh release view v0.1.0 --json assets --jq '.assets[].name'

# Ver ejecuciones del workflow de release
gh run list --workflow Release --branch main
```

### Versionado

release-please calcula la siguiente versión a partir de los commits convencionales. La primera release es `v0.1.0`:

- `package.json` y `package-lock.json`: `0.1.0`
- `release-please-config.json`: `initial-version: "0.1.0"`
- `.release-please-manifest.json`: `0.0.0` hasta que se cree la primera release

## Despliegue

Railway está conectado al repositorio de GitHub y despliega la rama `main` después de que el CI pase.

Cada release produce dos despliegues con la misma versión de la aplicación:

1. El merge de la promoción `develop → main`.
2. El merge de la PR de release.

El segundo es el deployment definitivo, porque incluye también el `CHANGELOG.md` y el manifiesto. Railway despliega commits, no tags: los artefactos `dist-vX.Y.Z.zip` del GitHub Release son para trazabilidad, no la fuente del despliegue.

### Verificación del despliegue

- Railway → entorno de producción → último deployment en `success`.
- `curl -s https://<dominio>/version.json` debe devolver `{"version":"0.1.0"}`.
- El footer del sitio debe mostrar `v0.1.0`.

## Primera release: checklist

- [ ] `issues: write` en `.github/workflows/release.yml`
- [ ] Labels `autorelease: pending` y `autorelease: tagged` creados
- [ ] **Allow GitHub Actions to create and approve pull requests** activado
- [ ] Required checks `Build` y `Version guard` aplicados a `main` y `develop`
- [ ] PR `develop → main` mergeada con merge commit
- [ ] PR de release mergeada con merge commit
- [ ] Tag `v0.1.0` y assets `dist-v0.1.0.zip` / `.sha256` verificados
- [ ] Deployment de Railway verificado
- [ ] `/version.json` y footer muestran `0.1.0`

## Troubleshooting

| Problema | Causa / solución |
| --- | --- |
| release-please no crea la PR de release | Falta `issues: write`, faltan los labels o el setting de Actions está desactivado. Revisar el log del workflow `Release`. |
| La PR de release se mergeó pero no hay tag | Falta el label `autorelease: pending`. Añadirlo a la PR mergeada y re-ejecutar el workflow `Release`. |
| PR bloqueada por `required_signatures` | Hay commits sin firmar. Firmarlos. No usar rebase: reescribe commits y los deja sin verificar. Los commits de release-please los verifica GitHub automáticamente. |
| `Version guard` falla | Se cambió la versión de `package.json` en una PR a `develop`. Revertir el cambio; la versión solo se modifica en `main`. |
| Railway no despliega | Revisar la conexión de la GitHub App, que la rama sea `main` y que **Wait for CI** esté configurado correctamente. |
| Faltan los assets del release | Revisar el run del workflow `Release`. El workflow detecta el tag en el commit y se puede re-ejecutar. |
