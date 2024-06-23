// backend/main.go
package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"backend/handlers"
	"backend/database"
)

func main() {
	database.ConnectDatabase()
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/api/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello, World!",
		})
	})

	r.GET("/api/tanaka", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, Tanaka!",
		})
	})

	r.GET("/api/users", handlers.GetUsers)

	r.POST("/api/register", handlers.RegisterHandler)
	r.POST("/api/login", handlers.LoginHandler)

	// TODO API routes
	r.GET("/api/todos", handlers.GetTodos)
	r.POST("/api/todos", handlers.CreateTodo)
	r.PUT("/api/todos/:id", handlers.ToggleTodoCompletion)

	r.Run()
}
