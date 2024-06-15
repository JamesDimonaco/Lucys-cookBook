use reqwest::{Client, Error};
use serde_json::{json, Value};
use std::env;

pub async fn call_openai(url: &str) -> Result<Value, Error> {
    let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY must be set");
    let client = Client::new();
    let response = client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", openai_api_key))
        .json(&json!({
            "model": "gpt-4o",
            "response_format": { "type": "json_object" },
            "messages": [
                {
                    "role": "system",
                    "content": [
     {
        "type": "text",
        "text": "You are a helpful assistant designed to output JSON with this schema"
    },
    {
        "type": "text",
        "text": "{\n  \"title\": \"string\",\n  \"ingredientSections\": [\n    {\n      \"title\": \"string\",\n      \"ingredients\": [\n        {\n          \"name\": \"string\"\n        }\n      ]\n    }\n  ],\n  \"content\": \"html rich text instructions method steps, use ordered lists create a 2 new html line inbetween each step Add title when nessery for new sections of instructions, Bolid Italics and highlights if needed \",\n  \"duration\": \"number\",\n  \"difficulty\": [\"easy\", \"medium\", \"hard\"],\n  \"type\": [\"breakfast\", \"lunch\", \"dinner\", \"dessert\"],\n  \"makes\": \"number\",\n  \"notes\": \"string\",\n  \"whereFrom\": \"string\"\n}"
    }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "this is a recipe, need you to return to me the title, ingredients, instructions, cook-time, difficulty, servings, notes, source and type",
                        },
                        {
                      "type": "image_url",
                         "image_url": {
                        "url": url

                        }
                }
                    ]
                }
            ],
           
        }))
        .send()
        .await?
        .json::<Value>()
        .await?;

    Ok(response)
}
