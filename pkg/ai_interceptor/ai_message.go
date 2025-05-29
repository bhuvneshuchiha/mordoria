package ai_interceptor

import "github.com/bhuvneshuhciha/project_mordoria/internal/message"

type IncomingMessages struct {
	ClientId string            `json:"client_id"`
	Payload  []message.Message `json:"payload"`
	// AiEmotScore string            `json:"ai_emot_score"`
}
