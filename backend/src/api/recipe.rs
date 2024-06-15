use actix_web::{web, HttpResponse, Responder};
use crate::repository::postgres::PostgresRepository;
use std::sync::Arc;
use crate::models::recipe::Recipe;

pub async fn get_all_recipes(repo: web::Data<Arc<PostgresRepository>>) -> impl Responder {
    match repo.get("SELECT * FROM recipes", Recipe::from_row).await {
        Ok(recipes) => {
            HttpResponse::Ok().json(recipes)
        },
        Err(err) => {
            eprintln!("Failed to retrieve recipes: {:?}", err);
            HttpResponse::InternalServerError().finish()
        },
    }
}

