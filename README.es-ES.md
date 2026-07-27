![image](https://github.com/user-attachments/assets/21bc7577-dd9f-424f-a5bf-d10266e7a5b4)

# 🎭 Proyecto Mordoria

¡Ya está ACTIVO! -> https://mordoriaa.thebhuvnesh.com/

### Juego de Chat Colaborativo Impulsado por IA

> Una innovadora experiencia de chat multijugador donde tus mensajes y emociones se combinan para crear respuestas generadas por IA en diversos tonos y estilos.

---

## 🎮 Cómo Funciona

**Project Mordoria** transforma el chat ordinario en una extraordinaria experiencia de narrativa colaborativa:

1. **Únete a la Sala** - Todos los jugadores se conectan a una única sala de chat compartida.
2. **Exprésate** - Escribe mensajes y asigna puntuaciones de emoción (0-10) para influir en el estilo de respuesta de la IA.
3. **Magia Colaborativa** - Cuando alguien comienza a escribir, comienza un temporizador de 30 segundos que recopila todos los mensajes.
4. **Respuesta de la IA** - Una vez que el temporizador expira, nuestra IA procesa todos los mensajes con su puntuación emocional promedio.
5. **Personalidades Dinámicas** - La IA responde en varios estilos: divertido, triste, ingenioso, sensual o cruel, dependiendo de la aportación colectiva.

---

## 🛠️ Stack Tecnológico

- **Backend**: Golang con soporte de WebSocket para comunicación en tiempo real.
- **Frontend**: React (JSX) para una interfaz de usuario responsiva.
- **Comunicación**: WebSockets para una interacción fluida entre cliente y servidor.
- **Integración de IA**: Groq API para la generación de respuestas inteligentes.

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Go instalado en tu sistema.
- Node.js y npm.
- Air (herramienta de recarga en vivo para Go).
- En caso de que quieras conectar diferentes PCs/laptops/teléfonos, por favor reemplaza "localhost" en `chatComponent.jsx` con la IP real.

### 🔑 Configuración de la API (IMPORTANTE)

1. Visita [Groq](https://groq.com) y crea una cuenta.
2. Haz clic en "Dev Console" en la parte superior derecha.
3. Haz clic en "API keys" en la parte superior derecha.
4. Genera tu clave de API.
5. Crea un archivo `.env` en el directorio raíz de tu proyecto:
   ```env
   GROQ_API_KEY="your-api-key-here"
   ```
   
   ⚠️ **Nota**: Es **GROQ** con "Q", no GROK con "K".

### 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/bhuvneshuchiha/mordoria.git
   cd mordoria
   ```

2. **Instala Go Air** (si aún no está instalado)
   ```bash
   go install github.com/cosmtrek/air@latest
   ```

3. **Instala las dependencias de Go**
   ```bash
   go mod download
   ```

4. **Instala las dependencias del frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### 🎯 Ejecutar la Aplicación

Necesitarás **dos pestañas/ventanas de terminal**:

**Terminal 1 - Servidor Backend:**
```bash
cd cmd/server
air
```

**Terminal 2 - Servidor de Desarrollo Frontend:**
```bash
cd frontend
npm run dev -- --host
```

### 🌐 Acceder al Juego

Una vez que ambos servidores estén ejecutándose, abre la URL que se muestra en tu terminal de frontend (normalmente `http://localhost:5173`) ¡y comienza a jugar!

---

## 🎨 Características

- **Colaboración en Tiempo Real** - Mira a otros jugadores escribir en tiempo real.
- **IA Impulsada por Emociones** - Tus emociones colectivas dan forma a la personalidad de la IA.
- **Múltiples Estilos de Respuesta** - Desde hilarante hasta conmovedor, ingenioso hasta malvado.
- **Experiencia de Sala Única** - Todos los jugadores comparten un espacio de chat dinámico.
- **Retroalimentación Instantánea** - Ciclos de respuesta de 30 segundos que mantienen la energía alta.

---

## 🤝 Contribuir

No dudes en enviar problemas, solicitudes de funciones o pull requests.

---

## 📄 Licencia

Este proyecto es de código abierto. Por favor, revisa el archivo de licencia para más detalles.

---

## 🎭 ¿Listo para jugar?

¡Únete al chat, expresa tus emociones y observa cómo la IA teje sus pensamientos colectivos en algo inesperado y entretenido!

**¡Felices juegos! 🚀**
