# Boletería - User Platform

Landing page y aplicativo web para usuarios finales de la plataforma Boletería.

## Tecnologías

- Angular 16+
- Angular Material personalizado
- SCSS
- Supabase (Auth, Database, Storage)

## Estructura del Proyecto

```
src/
├── app/
│   ├── auth/              # Componentes y servicios de autenticación
│   ├── components/        # Componentes reutilizables
│   ├── core/              # Servicios core, interceptores, guards
│   ├── layouts/           # Layouts de la aplicación
│   ├── models/            # Interfaces y modelos
│   ├── pages/             # Páginas principales
│   ├── services/          # Servicios para la lógica de negocio
│   └── shared/            # Módulos, directivas y pipes compartidos
├── assets/
│   ├── fonts/             # Fuentes personalizadas
│   ├── icons/             # Iconos SVG
│   └── images/            # Imágenes
├── environments/          # Configuraciones por entorno
└── styles/                # Sistema de diseño global
    ├── themes/            # Temas claro y oscuro
    ├── global.scss        # Estilos globales
    ├── mixins.scss        # Mixins de efectos visuales
    └── variables.scss     # Variables y tokens
```

## Características

- Landing page con diseño moderno inspirado en roark.ai
- Sistema de autenticación con Supabase
- Compra de boletos para eventos y pasajes de transporte
- Selección visual de asientos
- Wallet de boletos digitales
- Modo oscuro predeterminado con opción de modo claro

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

## Construcción

```bash
# Construir para producción
npm run build
```
