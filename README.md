# Project Manager Pro

Progressive Web App (PWA) para gestión de proyectos y reportes.  
Desarrollada con **Next.js 16, React 19 y TypeScript**, incluye dashboard, gráficos, exportación de reportes, autenticación y pruebas automatizadas.

El proyecto sigue una arquitectura **frontend / backend separada** y utiliza **PostgreSQL serverless** para la persistencia de datos.

---


---

## 🔧 Tecnologías

| Categoría       | Tecnologías                                    |
|-----------------|-----------------------------------------------|
| Frontend        | Next.js 16, React 19, TypeScript, TailwindCSS, Recharts, PWA (`next-pwa`) |
| Backend         | NestJS 11, TypeORM, PostgreSQL, JWT Auth, bcrypt, Passport, RxJS |
| Base de datos   | Neon PostgreSQL (São Paulo, Brasil)          |
| HTTP / Datos    | Axios                                         |
| Exportación     | jsPDF (PDF), XLSX (Excel)                    |
| Estado / Context| React Context, opcional Redux Toolkit / RTK Query |
| Testing         | Vitest, Jest, Testing Library, Cypress (E2E) |
| Calidad         | ESLint, Prettier                             |

---

## ⚡ Funcionalidades principales

- Dashboard interactivo de proyectos
- Gestión de tareas y progreso
- Gráficos de avance por proyecto
- Exportación de reportes a PDF y Excel
- Autenticación segura con JWT y refresh tokens
- Soporte PWA (instalable en móviles y escritorio)
- Tema oscuro / claro dinámico

---

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone <repo-url>
cd project-manager-pro
