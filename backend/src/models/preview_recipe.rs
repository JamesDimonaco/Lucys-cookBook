use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct PreviewRecipeRequest {
    pub image_url: String,
    pub user_id: Uuid,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PreviewRecipeResponse {
    pub id: String,
    pub title: String,
    pub content: Option<String>,
    pub image_url: Option<String>,
    pub difficulty: Option<String>,
    pub duration: Option<i32>,
    pub notes: Option<String>,
    pub tags: Vec<String>,
    pub type_: Option<String>,
    pub makes: Option<i32>,
    pub description: Option<String>,
    pub where_from: Option<String>,
    pub ingredient_sections: Vec<IngredientSection>, // New field for ingredient sections
}

#[derive(Debug, Serialize, Deserialize)]
pub struct IngredientSection {
    pub id: String,
    pub title: String,
    pub ingredients: Vec<Ingredient>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredient {
    pub id: String,
    pub name: String,
}


// impl PreviewRecipeResponse {
//     pub fn new(
//         id: String,
//         title: String,
//         content: Option<String>,
//         image_url: Option<String>,
//         difficulty: Option<String>,
//         duration: Option<i32>,
//         notes: Option<String>,
//         tags: Vec<String>,
//         type_: Option<String>,
//         makes: Option<i32>,
//         description: Option<String>,
//         where_from: Option<String>,
//     ) -> Self {
//         PreviewRecipeResponse {
//             id,
//             title,
//             content,
//             image_url,
//             difficulty,
//             duration,
//             notes,
//             tags,
//             type_,
//             makes,
//             description,
//             where_from,
//         }
//     }
// }
