use tokio_postgres::Row;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Recipe {
    pub id: String,                // Changed from i32 to String
    pub title: String,
    pub content: Option<String>,
    pub image_url: Option<String>,
    pub difficulty: Option<String>,
    pub duration: Option<i32>,
    pub notes: Option<String>,
    pub tags: Vec<String>,
    pub type_: Option<String>,     // Use `type_` to avoid conflict with Rust keyword
    pub makes: Option<i32>,
    pub description: Option<String>,
    pub where_from: Option<String>,
    // pub created_at: chrono::NaiveDateTime,
    // pub updated_at: chrono::NaiveDateTime,
}

impl Recipe {
    pub fn from_row(row: &Row) -> Self {
        Recipe {
            id: row.get("id"),
            title: row.get("title"),
            content: row.get("content"),
            image_url: row.get("image_url"),
            difficulty: row.get("difficulty"),
            duration: row.get("duration"),
            notes: row.get("notes"),
            tags: row.get("tags"),
            type_: row.get("type"),
            makes: row.get("makes"),
            description: row.get("description"),
            where_from: row.get("where_from"),
            // created_at: row.get("created_at"),
            // updated_at: row.get("updated_at"),
        }
    }
}
