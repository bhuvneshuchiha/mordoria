package websocket

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/bhuvneshuhciha/project_mordoria/internal/masterRoom"
	// "github.com/bhuvneshuhciha/project_mordoria/internal/message"
	"github.com/bhuvneshuhciha/project_mordoria/pkg/ai_interceptor"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var Upgrader = &websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func EstablishWebsocketConn(c *gin.Context, Upgrader *websocket.Upgrader) *websocket.Conn {
	ws, err := Upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to connected to websocket",
		})
		return nil
	}
	return ws
}

func WebsocketReadMessage(ws *websocket.Conn, room *masterRoom.MasterRoom) error {
	_, p, err := ws.ReadMessage()
	if err != nil {
		log.Println("Error occured", err)
		return err
	}
	log.Println("The incoming message string??", string(p))
	// var incomingMessage message.Message

	var incomingMessage ai_interceptor.IncomingMessages
	log.Println("This is the marshalled data", incomingMessage)

	er := json.Unmarshal(p, &incomingMessage)
	if er != nil {
		log.Println("Cannot Unmarshal the data")
		return er
	}
	msgStorage := &ai_interceptor.IncomingMessages{
		ClientId: incomingMessage.ClientId,
		Payload:  incomingMessage.Payload,
		// AiEmotScore: incomingMessage.AiEmotScore,
	}
	room.BroadCastMessage(msgStorage)
	log.Println("Message read from websocket.go", msgStorage)

	return nil
}

func WebSocketWriteMessage(ws *websocket.Conn, msg *ai_interceptor.IncomingMessages) error {
	// er := ws.WriteJSON(websocket.TextMessage, data)
	er := ws.WriteJSON(msg.Payload)
	log.Println("Message written", msg.Payload)
	if er != nil {
		log.Println("Error while writing to websocket", er)
		ws.Close()
		return er
	}
	return nil
}
