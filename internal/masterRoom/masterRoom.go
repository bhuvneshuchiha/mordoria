package masterRoom

import (
	"errors"
	"sync"

	"github.com/bhuvneshuhciha/project_mordoria/internal/client"
	// "github.com/bhuvneshuhciha/project_mordoria/internal/message"
	"github.com/bhuvneshuhciha/project_mordoria/pkg/ai_interceptor"
	"github.com/google/uuid"
)

type MasterRoom struct {
	ID      uuid.UUID                 `json:"id"`
	Clients map[string]*client.Client `json:"clients_table"`
	// ListenMessage chan *message.Message     `json:"message_string"`
	ListenMessage chan *ai_interceptor.IncomingMessages `json:"message_string"`
	RoomTag       string                                `json:"room_tag"`
	Mu            *sync.Mutex
}

var Room = CreateMasterRoom()

func CreateMasterRoom() *MasterRoom {
	return &MasterRoom{
		ID:            uuid.New(),
		Clients:       make(map[string]*client.Client),
		// ListenMessage: make(chan *message.Message),
		ListenMessage: make(chan *ai_interceptor.IncomingMessages),
		RoomTag:       "Witty",
		Mu:            &sync.Mutex{},
	}
}

func (m *MasterRoom) RunLoop() {
	for {
		msg := <-m.ListenMessage
		m.Mu.Lock()
		for _, client := range m.Clients {
			client.SendMessage <- msg
		}
		m.Mu.Unlock()
	}
}

func (m *MasterRoom) AddClient(client *client.Client, id string) error {
	if id == "" {
		return errors.New("Invalid ID")
	}

	_, ok := m.Clients[id]
	if ok {
		return errors.New("Client already attached to room")
	}

	m.Mu.Lock()
	m.Clients[id] = client
	m.Mu.Unlock()
	return nil
}

func (m *MasterRoom) RemoveClient(id string) error {
	if id == "" {
		return errors.New("Invalid ID")
	}

	_, ok := m.Clients[id]
	if !ok {
		return errors.New("Client does not exist")
	}

	m.Mu.Lock()
	delete(m.Clients, id)
	m.Mu.Unlock()
	return nil
}

//	func (m *MasterRoom) BroadCastMessage(message *message.Message) {
//		m.ListenMessage <- message
//	}
func (m *MasterRoom) BroadCastMessage(message *ai_interceptor.IncomingMessages) {
	m.ListenMessage <- message
}
