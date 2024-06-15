use actix_web::{web, HttpResponse, Responder};
use serde_json::Value;
use uuid::Uuid;

// Importing structs from modules
use crate::models::preview_recipe::{PreviewRecipeRequest, PreviewRecipeResponse, IngredientSection, Ingredient};
use crate::handlers::open_ai::call_openai; // Adjust the path as per your project structure

pub async fn create_new_preview_recipe(
    request: web::Json<PreviewRecipeRequest>,
) -> impl Responder {
    let image_url = &request.image_url;

    // Call OpenAI to process the image and get the recipe content
    match call_openai(image_url).await {
        Ok(openai_response) => {
            println!("OpenAI response: {:?}", openai_response);

            // Create a new recipe response from OpenAI response
            let recipe = create_recipe_from_openai_response(openai_response);
            println!("Recipe: {:?}", recipe);

            // Assuming saving the recipe to the database might go here
            // let repo_result = repo.save_recipe(recipe.clone()).await;

            HttpResponse::Ok().json(recipe)
        }
        Err(err) => {
            eprintln!("Failed to process image: {:?}", err);
            HttpResponse::InternalServerError().body("Failed to process image")
        }
    }
}

pub fn create_recipe_from_openai_response(openai_response: Value) -> PreviewRecipeResponse {
    // Extract the content field from OpenAI response
    let content = openai_response["choices"][0]["message"]["content"]
        .as_str()
        .expect("Missing 'content' field in OpenAI response");

    // Parse the content JSON string into a serde_json Value
    let parsed_content: Value = serde_json::from_str(content)
        .expect("Failed to parse 'content' JSON");

    // Extract ingredients sections from parsed content
    let ingredient_sections = if let Some(sections) = parsed_content["ingredientSections"].as_array() {
        sections.iter().map(|section| {
            let title = section["title"].as_str().unwrap_or("").to_string();
            let ingredients = if let Some(ingredients) = section["ingredients"].as_array() {
                ingredients.iter().map(|ingredient| {
                    let name = ingredient["name"].as_str().unwrap_or("").to_string();
                    Ingredient {
                        id: Uuid::new_v4().to_string(), // Generate unique ID for each ingredient
                        name,
                    }
                }).collect()
            } else {
                vec![]
            };
            IngredientSection {
                id: Uuid::new_v4().to_string(), // Generate unique ID for each section
                title,
                ingredients,
            }
        }).collect()
    } else {
        vec![]
    };

    // Construct the PreviewRecipeResponse object
    let mut recipe = PreviewRecipeResponse {
        id: Uuid::new_v4().to_string(),
        title: parsed_content["title"].as_str().unwrap_or("").to_string(),
        content: Some(parsed_content["content"].as_str().unwrap_or("").to_string()),
        image_url: None, // You can parse or set the image URL here if needed
        difficulty: parsed_content["difficulty"].as_str().map(|s| s.to_string()),
        duration: parsed_content["duration"].as_i64().map(|d| d as i32),
        notes: Some(parsed_content["notes"].as_str().unwrap_or("").to_string()),
        tags: vec![], // Adjust if tags are provided in the response
        type_: None, // Initialize type_ as None initially
        makes: parsed_content["makes"].as_i64().map(|m| m as i32),
        description: None, // Adjust if description is provided in the response
        where_from: Some(parsed_content["whereFrom"].as_str().unwrap_or("").to_string()),
        ingredient_sections,
    };

    // Handling type_ field separately to ensure it's Option<String>
    if parsed_content["type"].is_array() {
        let types: Vec<String> = parsed_content["type"]
            .as_array().unwrap()
            .iter()
            .filter_map(|t| t.as_str())
            .map(|t| t.to_string())
            .collect();
        recipe.type_ = Some(types.join(", "));
    } else if let Some(t) = parsed_content["type"].as_str() {
        recipe.type_ = Some(t.to_string());
    }

    recipe
}