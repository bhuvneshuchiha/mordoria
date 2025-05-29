package main

import (
	"log"
	"net/http"

	"github.com/bhuvneshuhciha/project_mordoria/internal/handlers"
	"github.com/bhuvneshuhciha/project_mordoria/internal/middlewares"
	"github.com/bhuvneshuhciha/project_mordoria/pkg/ai_interceptor"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CorsMiddleware())


	env_error := godotenv.Load("../../.env")
	if env_error != nil {
		log.Println("Error loading .env file", env_error)
		return
	}

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H {
		"message" : "success",
		"status" : 201,
		})
	})

	r.GET("/ws/v1/mordoria", handlers.SocketHandler)
	r.POST("/v1/mordoria/chat_summarize", ai_interceptor.InterceptorHandler)

	r.Run(":8081")
}
