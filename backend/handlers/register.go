package handlers

import (
    "backend/models"
    "net/http"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

func RegisterHandler(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
		print("tanaka")
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
        return
    }
    user.Password = string(hashedPassword)

    if result := models.DB.Create(&user); result.Error != nil {
        c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}
