# PROYECTO BOOTCAMP REACT - MARKETPLACE "Chacra a la olla"

## Descripción del Proyecto

Este proyecto es una aplicación de Mini Marketplace del emprendimiento llamado "Chacra a la olla" desarrollada como parte del Bootcamp de NTT. En esta segunda entrega, permite a los usuarios buscar productos, agregarlos al carrito y gestionar sus compras. A continuación, se detalla la estructura del proyecto y la funcionalidad de cada componente y servicio.

### Logo de "Chacra a la olla": 
<p align="center">
    <img src=".\src\assets\images\logo_oficial.png" alt="Logotipo" width="300" />
</p>

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el proyecto en modo desarrollo con `npm run dev`.
4. Abre el navegador y navega a `http://localhost:5173/`.

## Estructura de Carpetas

La estructura de carpetas para esta entrega inicial es la siguiente:


BOOTCAMP-FRONTEND-REACT-NTT/

├── src/                         # Código fuente principal del proyecto

│   ├── assets/                  # Recursos estáticos del proyecto

│   │   ├── images/              # Imágenes utilizadas en la aplicación

│   │   │   ├── cart-icon.png

│   │   │   ├── facebook-icon.png

│   │   │   ├── filter-icon.png

│   │   │   ├── heart-icon.png

│   │   │   ├── instagram-icon.png

│   │   │   ├── javascript.svg

│   │   │   ├── logo_oficial.png

│   │   │   ├── logo.png

│   │   │   ├── menu-icon.webp

│   │   │   ├── prototipo.png

│   │   │   └── x-icon.png

│   │   └── vite.svg             # Logo de Vite

│   ├── components/              # Componentes de React utilizados en la aplicación

│   │   ├── cart.js              # Componente para la funcionalidad del carrito de compras

│   │   ├── displayCategories.js # Componente para mostrar categorías de productos

│   │   └── displayProducts.js   # Componente para mostrar los productos

│   ├── public/                  # Archivos estáticos accesibles públicamente

│   ├── services/                # Servicios de la aplicación

│   │   └── product.service.js   # Clase para interactuar con la API de productos

│   ├── utils/                   # Utilidades generales del proyecto

│   │   ├── debounce.js          # Función de debounce para optimización de eventos

│   │   └── counter.js           # Archivo auxiliar para funcionalidades contables

│   ├── main.js                  # Archivo principal que inicializa la aplicación

│   └── style.css                # Archivo de estilos principal

├── public/                      # Recursos accesibles públicamente

├── .gitignore                   # Archivos y directorios ignorados por Git

├── package.json                 # Configuración del proyecto y dependencias

├── package-lock.json            # Registro de dependencias del proyecto

├── README.md                    # Documentación del proyecto

└── vite.config.js               # Configuración del entorno de Vite


### Prototipo: 
<p align="center">
    <img src=".\src\assets\images\prototipo.png" alt="Diseño de Figma" />
</p>

## Funcionalidad Detallada

#### `ProductService`

- **fetchProducts**: Obtiene productos con los parámetros `limit` y `skip` desde la API.
- **searchProducts**: Busca productos utilizando un query de búsqueda.
- **fetchCategories**: Obtiene todas las categorías desde la API.
- **fetchProductsByCategory**: Obtiene productos por categoría.
- **fetchCategoryNameBySlug**: Obtiene el nombre de una categoría por su slug.

### Componentes

#### `cart.js`

- **addToCartButton**: Añade productos al carrito y muestra controles de cantidad.
- **addToCart**: Añade productos al carrito y los guarda en `localStorage`.
- **removeFromCart**: Elimina productos del carrito y actualiza `localStorage`.
- **updateCartQuantity**: Actualiza la cantidad de productos en el carrito.
- **updateCartCount**: Actualiza el contador de productos en el carrito.

#### `displayCategories.js`

- **displayCategories**: Muestra las categorías de productos y permite seleccionar una categoría para filtrar los productos.
- **setActiveCategory**: Establece la categoría activa y actualiza la interfaz de usuario.

#### `displayProducts.js`

- **displayProducts**: Muestra los productos en el DOM con sus respectivos controles de cantidad.
- **clearSearchInput**: Limpia el campo de búsqueda.

### Utilidades

#### `debounce.js`

- **debounce**: Evita que una función se ejecute más de una vez en un cierto período de tiempo.
