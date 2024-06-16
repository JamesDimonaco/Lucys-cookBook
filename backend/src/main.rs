use actix_web::{web, App, HttpServer, middleware::Logger};
use actix_cors::Cors;
use std::sync::Arc;
use repository::postgres::PostgresRepository;
use dotenv;
use env_logger;


mod handlers;
mod api;
mod repository;
mod models;

use api::preview_recipe::create_new_preview_recipe;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    // TODO: Audit that the environment access only happens in single-threaded code.
    unsafe { std::env::set_var("RUST_LOG", "actix_web=info") };
    env_logger::init();

    println!("Starting server");

    let repository = match PostgresRepository::new().await {
        Ok(repo) => {
            println!("Repository created successfully");
            Arc::new(repo)
        },
        Err(e) => {
            eprintln!("Failed to create repository: {:?}", e);
            return Err(std::io::Error::new(std::io::ErrorKind::Other, "Failed to create repository"));
        }
    };


    
    let server = HttpServer::new(move || {
        let logger = Logger::default();
        let postgres_data = web::Data::new(repository.clone());

        let cors = Cors::default().allowed_origin_fn(|origin, _| {
            dotenv::var("ENV").unwrap_or_else(|_| "production".to_string()) == "development"
                && origin == "http://localhost:3000"
            }).allowed_origin("https://lucys-cook-book.vercel.app")
            .allowed_origin("https://recipes.dimonaco.co.uk")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec!["Content-Type", "Authorization"]);
        App::new()
            .wrap(cors)
            .app_data(postgres_data)
            .route("/create_recipe_preview", web::post().to(create_new_preview_recipe))
            .route("/recipes", web::get().to(api::recipe::get_all_recipes))
            .wrap(logger)
    });

    println!("Attempting to bind to port");


    match server.bind(("0.0.0.0", 3232)) {
        Ok(srv) => {
            println!("Successfully bound to port 3232");
            srv.run().await?;

        },
        Err(e) => {
            eprintln!("Failed to bind to port 3232: {:?}", e);
            return Err(std::io::Error::new(std::io::ErrorKind::AddrInUse, "Address already in use"));
        }
    };

    
    Ok(())
}
