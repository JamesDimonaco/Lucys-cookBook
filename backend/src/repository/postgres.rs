// repository/postgres.rs
use tokio_postgres::{NoTls, Error, Client};
use std::env;
use tokio_postgres::Row;

pub struct PostgresRepository {
    client: Client,
}

impl PostgresRepository {
    pub async fn new() -> Result<Self, Error> {
        dotenv::dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let (client, connection) = tokio_postgres::connect(&database_url, NoTls).await?;

        tokio::spawn(async move {
            if let Err(e) = connection.await {
                eprintln!("Connection error: {}", e);
            }
        });

        Ok(Self { client })
    }

    pub async fn get<T>(&self, query: &str, row_mapper: fn(&Row) -> T) -> Result<Vec<T>, Error> {
        let rows = self.client.query(query, &[]).await?;
        let items = rows.iter().map(row_mapper).collect();
        Ok(items)
    }
}
