package handlers

import (
	"backend/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(c *gin.Context) {
    var registerDetails struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }
    if err := c.ShouldBindJSON(&registerDetails); err != nil {
        log.Println("Invalid input:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerDetails.Password), bcrypt.DefaultCost)
    if err != nil {
        log.Println("Could not hash password:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
        return
    }

    user := models.User{
        Username: registerDetails.Username,
        Password: string(hashedPassword),
    }

    if err := models.DB.Create(&user).Error; err != nil {
        log.Println("Could not create user:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}
