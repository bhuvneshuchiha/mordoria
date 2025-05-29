package message

type Message struct {
	// Client_id      string `json:"client_id"`
	MessageString  string `json:"payload"`
	ClientEmoScore string `json:"ai_emot_score"`
}
