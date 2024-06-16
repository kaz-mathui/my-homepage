package handlers

import (
    "backend/models"
    "net/http"
    "os"
    "time"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "log"
)

func generateToken(user models.User) (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": user.Username,
        "exp":      time.Now().Add(time.Hour * 72).Unix(),
    })

    secret := os.Getenv("JWT_SECRET")
    tokenString, err := token.SignedString([]byte(secret))
    if err != nil {
        return "", err
    }
    return tokenString, nil
}

func LoginHandler(c *gin.Context) {
    var loginDetails struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }
    if err := c.ShouldBindJSON(&loginDetails); err != nil {
        log.Println("Invalid input")
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var user models.User
    if err := models.DB.Where("username = ?", loginDetails.Username).First(&user).Error; err != nil {
        log.Println("Invalid username or password: ", err)
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
        return
    }

    log.Printf("Comparing password for user %s", user.Username)
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password)); err != nil {
        log.Println("Password comparison failed: ", err)
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
        return
    }

    token, err := generateToken(user)
    if err != nil {
        log.Println("Could not generate token: ", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
        return
    }

    log.Printf("User %s logged in successfully", user.Username)
    c.JSON(http.StatusOK, gin.H{"token": token})
}
