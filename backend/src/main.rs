use actix_web::{web, App, HttpServer, middleware::Logger};
use std::sync::Arc;
use repository::postgres::PostgresRepository;

mod handlers;
mod api;
mod repository;
mod models;

// struct AppState {
//     openai_api_key: String,
// }
 
use api::preview_recipe::create_new_preview_recipe;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // let openai_api_key: String = std::env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY must be set");

    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let repository = Arc::new(PostgresRepository::new().await.expect("Failed to create repository"));

    HttpServer::new(move || {
        let logger = Logger::default();
        let postgres_data = web::Data::new(repository.clone());

        App::new()
            // .app_data(AppState {
            //     openai_api_key: openai_api_key.clone(),
            // })
            .app_data(postgres_data)
            .route("/create_recipe_preview", web::post().to(create_new_preview_recipe))
            .route("/recipes", web::get().to(api::recipe::get_all_recipes))
            .wrap(logger)
    })
    .bind(("127.0.0.1", 4000))?
    .run()
    .await
}
