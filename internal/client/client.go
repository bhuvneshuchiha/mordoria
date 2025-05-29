package client

import (
	// "github.com/bhuvneshuhciha/project_mordoria/internal/message"
	"github.com/bhuvneshuhciha/project_mordoria/pkg/ai_interceptor"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Client struct {
	Conn *websocket.Conn
	ID uuid.UUID
	// SendMessage chan *message.Message
	SendMessage chan *ai_interceptor.IncomingMessages
	MessagesCount int
}

