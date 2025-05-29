#
1. AI CHAT GAME -> PROJECT MORDORIA

# How does it work?
1. Players can join a single room. As of this moment there are no multiple rooms.
2. Once joined, players can write anything in the text box and provide an emotion
   score from 0 to 10, which will determine the final response of the LLM.
3. As soon as anyone in the chat room starts typing, all the chat messages with
   the average emotion score will be send to an LLM after 30 seconds
   from the first typed message. Once all the messages are sent, the LLM will
   prepare a summary of those messages in a funny, sad, witty, sensual or very
   mean way.

# Tech Stack.
1. GO Backend
2. JSX(react) frontend.
3. Websockets for client server communication.

# IMPORTANT ->
1. In order to play this please go to groq and create an API key.
2. Create a .env file in your project's root directory.
3. Put the API key as GROQ_API_KEY="your-api_key"
4. Remember it is GROQ with a Q and not GROK with a K.

# Steps to install and play.
1. Clone this repo and install go-air.
2. Go to project_mordoria/ and run go mod download.
3. Go to project_mordoria/frontend and run npm install.
4. Keep 2 tabs open in your tmux or terminal and in one, go to cmd/server and
   run "air".
5. On the another tab run npm run dev.
6. Open the link shown after running npm run dev and you are good to go.
