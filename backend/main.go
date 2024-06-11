package main

import (
    "fmt"
    "log"
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
    _ "github.com/lib/pq"
    "github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func initDB() {
    var err error
    connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"))

    db, err = sqlx.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }

    if err = db.Ping(); err != nil {
        log.Fatal(err)
    }
}

func main() {
    initDB()
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

    r.GET("/api/users", func(c *gin.Context) {
        var users []struct {
            ID    int    `json:"id"`
            Name  string `json:"name"`
            Email string `json:"email"`
        }

        err := db.Select(&users, "SELECT id, name, email FROM users")
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, users)
    })

    r.Run() // デフォルトで :8080 で実行されます
}
