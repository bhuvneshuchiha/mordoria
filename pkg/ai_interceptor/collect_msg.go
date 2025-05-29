package ai_interceptor

import (
	"log"
	"net/http"

	finalMessage "github.com/bhuvneshuhciha/project_mordoria/pkg/final_message"
	"github.com/bhuvneshuhciha/project_mordoria/pkg/groq_controllers"
	"github.com/gin-gonic/gin"
)


func InterceptorHandler(c *gin.Context) {
	err := c.BindJSON(&finalMessage.MsgBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		log.Println("Here is the error", err.Error())
		return
	}
	er := groq_controllers.PrepareData(finalMessage.MsgBody, groq_controllers.DataStruct)
	if er != nil {
		c.JSON(http.StatusBadRequest, gin.H {
			"success": "false",
			"message" : er,
		})
		return
	}
	respString, e := groq_controllers.SendDataToGroq()
	if e != nil {
		log.Println("Got an error while requesting from groq, file: collect_msg.go", e)
		c.JSON(http.StatusBadRequest, gin.H {
			"success": "false",
			"message": e,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H {
		"success": "true",
		"message": respString,
	})

	return
}
