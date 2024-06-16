package main

import (
    "fmt"
    "log"
    "net/http"
    "os"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    _ "github.com/lib/pq"
    "github.com/jmoiron/sqlx"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"

    "backend/handlers"
    "backend/models"
)

var db *sqlx.DB
var gormDB *gorm.DB

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

    gormDB, err = gorm.Open(postgres.Open(connStr), &gorm.Config{})
    if err != nil {
        log.Fatal(err)
    }

    models.InitDB(gormDB)
}

func main() {
    initDB()
    r := gin.Default()

    r.Use(cors.Default())

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
            UserName  string `json:"username"`
        }

        err := db.Select(&users, "SELECT id, username FROM users")
        if (err != nil) {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, users)
    })

    r.POST("/api/register", handlers.RegisterHandler)

    r.Run()
}
