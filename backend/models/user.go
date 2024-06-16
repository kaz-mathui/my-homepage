package models

import (
    "gorm.io/gorm"
)

var DB *gorm.DB

type User struct {
    gorm.Model
    Username string `json:"username" gorm:"unique"`
    Password string `json:"-"`
}

func InitDB(db *gorm.DB) {
    DB = db
    DB.AutoMigrate(&User{})
}
