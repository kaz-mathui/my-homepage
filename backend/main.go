package main

import (
	"backend/database"
	"backend/handlers"
	"backend/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

  // TODO API routes with AuthMiddleware
  authorized := r.Group("/")
  authorized.Use(middleware.AuthMiddleware())
  {
    authorized.GET("/api/todos", handlers.GetTodos)
    authorized.POST("/api/todos", handlers.CreateTodo)
    authorized.PUT("/api/todos/:id", handlers.ToggleTodoCompletion)
  }

  r.Run()
}
