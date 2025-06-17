# 🧠 Junior Memory Game

Un juego de memoria interactivo y responsive desarrollado en tecnología web pura (HTML5, CSS3, JavaScript ES6).

## 📋 Descripción

Junior Memory Game es un juego clásico de encontrar parejas de cartas con múltiples modos de juego y configuraciones personalizables. El objetivo es encontrar todas las parejas de cartas en el menor número de movimientos posible.

## ✨ Características

- **Tablero Configurable**: Filas y columnas ajustables (siempre manteniendo un número par de cartas)
- **Tres Modos de Juego**:
  - **Clásico**: Las cartas comienzan boca abajo
  - **Por Tiempo**: Modo con límite de tiempo configurable
  - **Flash**: Las cartas se muestran brevemente al inicio

- **Imágenes Personalizables**: Sube tus propias imágenes o usa emojis por defecto
- **Diseño Responsive**: Adaptable a móviles, tablets y escritorio
- **Estadísticas en Tiempo Real**: Movimientos, parejas encontradas, tiempo y puntuaciones por jugador
- **Modo Multijugador**: Soporte para 1-6 jugadores con turnos alternados (WIP)
- **Sistema de Turnos**: En multijugador, los jugadores alternan turnos y pueden continuar si aciertan (WIP)


## 🎮 Modos de Juego

### 1. Modo Clásico
- Las cartas comienzan todas boca abajo
- No hay límite de tiempo
- Enfoque en encontrar parejas con el menor número de movimientos

### 2. Modo Flash
- Al inicio del juego, todas las cartas se muestran por un tiempo configurable (1-10 segundos)
- Después se voltean y comienza el juego normal
- Perfecto para ejercitar la memoria visual

### 3. Modo Por Tiempo
- Tienes un tiempo límite configurable (30-300 segundos) para encontrar todas las parejas
- Agrega emoción y urgencia al juego
- Ideal para desafíos rápidos

## 🎯 Cómo Jugar

1. **Configurar el Juego**:
   - Selecciona el número de filas y columnas
   - Elige el número de jugadores (1-6)
   - Selecciona el modo de juego
   - Configura los tiempos si es necesario
   - Opcionalmente, carga imágenes personalizadas

2. **Iniciar Partida**:
   - Haz clic en "Nuevo Juego"
   - En multijugador, se mostrará la información de todos los jugadores
   - En modo Flash, memoriza las cartas durante el tiempo mostrado

3. **Jugar**:
   - **Un Jugador**: Juega normalmente buscando parejas
   - **Multijugador**: (En progreso)
     - El jugador activo (destacado) hace su movimiento
     - Si encuentra pareja, continúa jugando
     - Si falla, pasa al siguiente jugador
   - Haz clic en una carta para voltearla
   - Haz clic en una segunda carta
   - Si coinciden, permanecerán volteadas
   - Si no coinciden, se voltearán después de 1 segundo

4. **Ganar**:
   - **Un Jugador**: Encuentra todas las parejas en el menor tiempo/movimientos
   - **Multijugador**: El jugador con más parejas encontradas gana
   - En modo por tiempo, completa antes de que se acabe el tiempo

## 🔧 Configuración

### Tablero
- **Filas**: 2-6 filas
- **Columnas**: 2-8 columnas
- El sistema automáticamente ajusta para mantener un número par de cartas

### Jugadores
- **Cantidad**: 1-6 jugadores
- **Turnos**: Automáticos con indicador visual del jugador activo
- **Puntuación**: Individual por jugador

### Tiempos
- **Tiempo Flash**: 1-10 segundos (solo modo Flash)
- **Tiempo Límite**: 30-300 segundos (solo modo Por Tiempo)

### Imágenes
- **Por Defecto**: 20 emojis de animales incluidos
- **Personalizadas**: Sube tus propias imágenes desde tu dispositivo (mínimo 8 para un juego 4x4)
- **Directorio /imgs**: Carga automáticamente imágenes desde el directorio imgs del proyecto

## 📁 Estructura del Proyecto

```
junior-memory-game/
├── index.html              # Archivo principal del juego
├── README.md              # Documentación del proyecto
├── imgs/                  # Directorio para imágenes del juego
│   ├── img1.jpg          # Imágenes numeradas
│   ├── img2.png          # Diferentes formatos soportados
│   ├── cat.jpg           # Imágenes con nombres descriptivos
│   ├── dog.png           # (jpg, jpeg, png, gif, webp)
│   └── ...               # Más imágenes
├── css/
│   └── style_jm.css         # Estilos del juego (incluidos en index.html)
├── js/
│   └── script_jm.js           # Lógica del juego (incluida en index.html)
└── docs/
    └── screenshots/       # Capturas de pantalla del juego
```

## 🚀 Instalación y Ejecución

### Opción 1: Ejecutar Directamente
1. Descarga el archivo `index.html`
2. Abre el archivo en cualquier navegador web moderno
3. ¡Listo para jugar!

### Opción 2: Servidor Local (Recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Con PHP
php -S localhost:8000

# Juega directamente en Github Pages
https://sanidevix.github.io/junior-memory/

```

Luego accede a `http://localhost:8000` en tu navegador.

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: 
  - 📱 Móviles (iOS, Android)
  - 📱 Tablets
  - 💻 Escritorio (Windows, macOS, Linux)

## 🎨 Personalización

### Agregar Imágenes Personalizadas

#### Opción 1: Subir desde dispositivo
1. Haz clic en "Cargar Imágenes"
2. Selecciona múltiples archivos de imagen
3. Asegúrate de tener al menos el número de imágenes necesarias para tu tablero
4. Haz clic en "Usar Imágenes"

#### Opción 2: Usar directorio /imgs
1. Coloca tus imágenes en el directorio `imgs/` del proyecto
2. Usa nombres descriptivos como: `cat.jpg`, `dog.png`, `img1.jpg`, etc.
3. Formatos soportados: JPG, JPEG, PNG, GIF, WebP
4. Haz clic en "Cargar desde /imgs" para cargar automáticamente las imágenes disponibles
5. En este repositorio se encuentran las imagenes del juego original (1980 - Ravensburger Original Junior Memory Game)

#### Nombres de archivos recomendados:
- **Numerados**: `img1.jpg`, `img2.png`, `image1.jpg`, etc.
- **Animales**: `cat.jpg`, `dog.png`, `bird.gif`, etc.
- **Frutas**: `apple.jpg`, `banana.png`, `orange.gif`, etc.
- **Vehículos**: `car.jpg`, `truck.png`, `plane.gif`, etc.
- **Naturaleza**: `sun.jpg`, `moon.png`, `star.gif`, etc.

### Modificar Estilos
Los estilos están incluidos en el archivo CSS. Puedes modificar:
- Colores del tema
- Animaciones de las cartas
- Tamaños y espaciados
- Efectos visuales

### Agregar Nuevos Modos
El código está estructurado para facilitar la adición de nuevos modos de juego en la clase `MemoryGame`.

## 🏆 Estadísticas

### Individuales (Un Jugador)
- **Movimientos**: Número de pares de cartas volteadas
- **Parejas**: Número de parejas encontradas
- **Tiempo**: Tiempo transcurrido o restante

### Multijugador
- **Por Jugador**: Parejas encontradas, movimientos realizados
- **Globales**: Movimientos totales, tiempo de partida
- **Clasificación**: Tabla de resultados final con posiciones

## 🐛 Solución de Problemas

### Las imágenes no se cargan
- **Imágenes subidas**: Verifica que los archivos sean imágenes válidas (JPG, PNG, GIF, WebP)
- **Directorio /imgs**: Asegúrate de que el directorio existe y contiene imágenes
- **Nombres de archivo**: Usa nombres sin espacios y caracteres especiales
- **Cantidad**: Verifica tener suficientes imágenes para el tamaño del tablero

### El juego no responde en móviles
- Verifica que estés usando un navegador moderno
- Comprueba que JavaScript esté habilitado

### Problemas de rendimiento
- Reduce el tamaño del tablero para dispositivos más lentos
- Usa imágenes más pequeñas para mejor rendimiento

## 🔄 Actualizaciones Futuras

- [x] Sistema multijugador (1-6 jugadores)
- [x] Turnos alternados con continuación por acierto
- [x] Puntuación individual por jugador
- [x] Modificar cover de Modo Flash para ver mejor las cartas
- [ ] Sistema de puntuación global persistente
- [ ] Múltiples niveles de dificultad
- [ ] Sonidos y música
- [ ] Multijugador online
- [ ] Temas visuales adicionales
- [ ] Torneos y competiciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu funcionalidad
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor:
- Abre un issue en el repositorio
- Describe detalladamente el problema
- Incluye capturas de pantalla si es necesario

---

**¡Diviértete jugando Junior Memory Game! 🎉**
