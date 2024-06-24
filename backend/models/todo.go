package models

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Task      string `json:"task"`
	Completed bool   `json:"completed"`
	UserID    uint   `json:"user_id"` // UserIDフィールドを追加
}
