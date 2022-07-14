package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"net/http"
	"os"
	"time"
)

type post struct {
	UserID int    `json:"userId"`
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Body   string `json:"body"`
}

var reportFile = "cms-" + time.Now().Format("2006-01-02") + ".json"

func main() {
	storeCmsSummaryReport()
}

func storeCmsSummaryReport() {
	resp, err := http.Get("https://jsonplaceholder.typicode.com/posts")
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var posts []post
	err = json.Unmarshal(body, &posts)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("CMS data has %d records\n", len(posts))

	summary := make(map[string]float64)
	users := make(map[int]bool)
	for _, post := range posts {
		users[post.UserID] = true
	}
	summary["posts"] = float64(len(posts))
	summary["users"] = float64(len(users))
	summary["mean_posts_per_user"] = math.Round(summary["posts"] / summary["users"])

	f, err := os.Create(reportFile)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	jsonText, err := json.Marshal(summary)
	if err != nil {
		log.Fatal(err)
	}
	_, err = f.WriteString(string(jsonText))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Wrote CMS report")
}
