package groq_controllers

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	finalMessage "github.com/bhuvneshuhciha/project_mordoria/pkg/final_message"
)

type PreparedDataStruct struct {
	MessageList []string
	AiScore     string
	MainMessage string
}

var DataStruct = &PreparedDataStruct{
	MessageList: []string{},
	AiScore:     "",
	MainMessage: "",
}

type GroqMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type GroqRequest struct {
	Model   string        `json:"model"`
	Message []GroqMessage `json:"messages"`
}

type GroqResponse struct {
	Choices []struct {
		Message GroqMessage `json:"message"`
	} `json:"choices"`
}

func BuildPromptFromStruct(data *PreparedDataStruct) (string, error) {
	var sb strings.Builder

	sb.WriteString("MessageList:\n")
	for _, msg := range data.MessageList {
		sb.WriteString("- ")
		sb.WriteString(msg)
		sb.WriteString("\n")
	}

	sb.WriteString("\nAiScore: ")
	sb.WriteString(data.AiScore)
	sb.WriteString("\n\nMain Instructions:\n")
	sb.WriteString(data.MainMessage)

	return sb.String(), nil
}

func PrepareData(msgPayload *finalMessage.FinalPayload, dataStruct *PreparedDataStruct) error {
	tempList := make([]string, 5)
	averageScore := msgPayload.Ai_emot_score

	DataStruct.MainMessage = `You are a smart assistant, your job is to take all these messages
	present in the array, and create a summary out of those messages.
	The emotion of the summary should be determind by the ai_score parameter.
	If the ai_score is between 0-2, the the response should be really sad,
	depressing, and dull. If the ai_score is betweeen 3-5, the the message
	should be rude and arrogant and you should act like a toxic dad. If the
	ai_score is between 5-8, then you should response with very sexual content
	and try to make the users uncomfortable.If the response is above 8 then
	you should be very very witty, sarcastic, smart, egoistic and charismatic.
	Few things to remember, please dont mention the ai_score anywhere in your summary,
	the messages that you receive, dont show \ / \n \t escape characters like these.
	Finally your response should be revolving around the messages that you have received.`

	msg := msgPayload.Payload
	for _, val := range msg {
		tempList = append(tempList, val.MessageString)
	}
	if len(tempList) > 0 && (averageScore != "0") {
		DataStruct.MessageList = tempList
		DataStruct.AiScore = averageScore
	} else {
		log.Println("Either temp list was empty or average score is not string")
		return errors.New("Either temp list was empty or average score is not string")
	}
	return nil
}

func SendDataToGroq() (string, error) {
	err := PrepareData(finalMessage.MsgBody, DataStruct)
	if err != nil {
		log.Println("Some error happened in prepare data", err)
		return "", err
	}
	prettyPrompt, err := BuildPromptFromStruct(DataStruct)
	if err != nil {
		log.Println("Json was not properly converted to string", err)
		return "Error:", err
	}
	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		return "api key was not found", errors.New("Api key not found")
	}

	url := "https://api.groq.com/openai/v1/chat/completions"
	requestBody := GroqRequest{
		Model: "llama-3.3-70b-versatile",
		Message: []GroqMessage{
			{
				Role:    "user",
				Content: prettyPrompt,
			},
		},
	}
	jsonBody, _ := json.Marshal(requestBody)
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "Error while sending to groq's endpoint", err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		log.Println("Groq response code:", resp.StatusCode)
		return "", fmt.Errorf("Groq API error: %s", string(body))
	}
	var groqResponse GroqResponse
	if err := json.Unmarshal(body, &groqResponse); err != nil {
		return "", err
	}
	if len(groqResponse.Choices) > 0 {
		return groqResponse.Choices[0].Message.Content, nil
	}

	return "", errors.New("No response from groq")
}
