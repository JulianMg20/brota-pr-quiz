# brota-pr-quiz

Quiz automático en los Pull Requests: antes de fusionar, la persona autora responde preguntas
sobre **su propio cambio**: qué archivo de pruebas trae (o si no trae ninguno), qué archivos toca, qué crea, qué declara y cuántas líneas agrega.
Idea inspirada en PR-Quiz-Demo; esta es una implementación propia.

## Cómo funciona

1. Al abrir o actualizar un PR (`pull_request_target`), el workflow `PR Quiz` lee los archivos del
   PR con la API, genera hasta 4 preguntas de opción múltiple y las publica en un comentario.
   El commit queda con el estado `pr-quiz` en **pending**.
2. La persona autora responde con un comentario: `/quiz A C B D`.
3. El workflow corrige y contesta cuántas acertó. Con todas correctas el estado pasa a **success**;
   tras 3 intentos fallidos pasa a **failure** y hace falta un commit nuevo (que trae otro quiz).

Las respuestas correctas nunca se publican: en el comentario solo va su firma HMAC con el secreto
`QUIZ_SECRET`. Como usa `pull_request_target`, el workflow ejecuta el código de la rama base, no el
del PR, así que nadie puede cambiar el generador en su PR para ver las respuestas.

## Archivos

| Archivo | Qué hace |
| --- | --- |
| `scripts/pr-quiz.mjs` | Núcleo puro: genera preguntas, firma, corrige, lee/escribe el comentario |
| `scripts/pr-quiz-action.mjs` | Conecta el núcleo con la API de GitHub (`generar`, `responder`) |
| `.github/workflows/pr-quiz.yml` | Dispara `generar` en PR y `responder` en comentarios `/quiz` |
| `.github/pull_request_template.md` | Plantilla de PR que explica el quiz |
| `tests/pr-quiz.test.mjs` | Pruebas del núcleo (`npm test`) |

## Instalarlo en otro repo

1. Copia `scripts/pr-quiz.mjs`, `scripts/pr-quiz-action.mjs` y `.github/workflows/pr-quiz.yml`.
2. Crea el secreto `QUIZ_SECRET` (Settings → Secrets and variables → Actions) con un valor aleatorio largo.
3. Opcional: en la protección de la rama, marca `pr-quiz` como *required status check* para que el
   PR no se pueda fusionar sin aprobar el quiz.
