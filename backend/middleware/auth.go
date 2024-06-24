package middleware

import (
  "fmt"
  "net/http"
  "os"
  "strings"

  "github.com/dgrijalva/jwt-go"
  "github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
  return func(c *gin.Context) {
    authHeader := c.GetHeader("Authorization")
    if authHeader == "" {
      c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
      c.Abort()
      return
    }

    tokenString := strings.TrimPrefix(authHeader, "Bearer ")
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
      if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
        return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
      }
      return []byte(os.Getenv("JWT_SECRET")), nil
    })

    if err != nil {
      c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
      c.Abort()
      return
    }

    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
      userID, ok := claims["userID"].(float64)
      if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
        c.Abort()
        return
      }
      c.Set("userID", uint(userID))
      c.Next()
    } else {
      c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
      c.Abort()
      return
    }
  }
}
