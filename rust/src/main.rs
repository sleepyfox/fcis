use reqwest::{self};
use serde::{Deserialize, Serialize};
use serde_json::from_str;
use std::collections::HashSet;
use std::fs::{create_dir_all, read_to_string, File};
use std::io::prelude::*;

#[derive(Serialize, Deserialize, Debug)]
#[allow(non_snake_case)]
pub struct Item {
    userId: u16,
    id: u16,
    title: String,
    body: String,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Report {
    posts: u16,
    users: u16,
    mean_posts_per_user: f32,
}
fn main() {
    println!("Getting CMS data");
    let client = reqwest::blocking::Client::builder().build().unwrap();
    let result = match client
        .get("http://jsonplaceholder.typicode.com/posts")
        .send()
    {
        Ok(v) => {
            match v.error_for_status_ref() {
                Err(_) => {
                    println!("CMS not contactable");
                }
                _ => (),
            }
            v.text().unwrap()
        }
        Err(_) => {
            println!("CMS not contactable");
            return ();
        }
    };
    let vector: Vec<Item> = match serde_json::from_str(&result) {
        Ok(t) => t,
        Err(_) => {
            println!("Invalid JSON Detected");
            return ();
        }
    };
    let mut unique_users = HashSet::new();
    for item in vector.iter() {
        unique_users.insert(item.userId);
    }
    let report = Report {
        posts: vector.len() as u16,
        users: unique_users.len() as u16,
        mean_posts_per_user: vector.len() as f32 / unique_users.len() as f32,
    };
    let date_now = chrono::offset::Local::now();
    let file_name = format!("cms-{}.json", date_now.format("%Y-%m-%d"));
    let mut data_file = File::create(&file_name).unwrap();
    data_file
        .write(serde_json::to_string_pretty(&report).unwrap().as_bytes())
        .unwrap();
    println!("Wrote CMS Report");

    let length = vector.len();
    println!("CMS data has {:?} records", length);
    let file_contents = read_to_string(file_name).unwrap();
    let parsed_report: Report = from_str(&file_contents).unwrap();
    println!("{:?}", parsed_report);
}

#[cfg(test)]
mod tests {
    use chrono;
    use serial_test::serial;
    use std::fs;

    use super::*;

    fn setup() {
        main();
    }

    #[test]
    #[serial]
    fn test_100_posts() {
        setup();
        let date_now = chrono::offset::Local::now();
        let file_name = format!("cms-{}.json", date_now.format("%Y-%m-%d"));
        let file_contents = read_to_string(file_name).unwrap();
        let parsed_report: Report = from_str(&file_contents).unwrap();
        assert_eq!(parsed_report.posts, 100);
    }
    #[test]
    #[serial]
    fn test_10_user() {
        setup();
        let date_now = chrono::offset::Local::now();
        let file_name = format!("cms-{}.json", date_now.format("%Y-%m-%d"));
        let file_contents = read_to_string(file_name).unwrap();
        let parsed_report: Report = from_str(&file_contents).unwrap();
        assert_eq!(parsed_report.users, 10);
    }
    #[test]
    #[serial]
    fn test_10_mean_posts() {
        setup();
        let date_now = chrono::offset::Local::now();
        let file_name = format!("cms-{}.json", date_now.format("%Y-%m-%d"));
        let file_contents = read_to_string(file_name).unwrap();
        let parsed_report: Report = from_str(&file_contents).unwrap();
        assert_eq!(parsed_report.mean_posts_per_user, 10.0);
    }
}
