package finalMessage

import "github.com/bhuvneshuhciha/project_mordoria/internal/message"

// store all the messages coming from the client to send to groq
type FinalPayload struct {
	ClientId      string            `json:"client_id"`
	Payload       []message.Message `json:"payload"`
	Ai_emot_score string            `json:"ai_emot_score"`
}

var MsgBody *FinalPayload = &FinalPayload{}
