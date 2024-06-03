package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    r.GET("/api/hello", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "Hello, World!",
        })
    })

    r.GET("/api/tanaka", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "Hello, Tanaka!",
        })
    })

    r.Run() // デフォルトで :8080 で実行されます
}
