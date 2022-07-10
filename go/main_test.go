package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"testing"
)

type summary map[string]float64

func getReport() ([]byte, error) {
	os.Remove(reportFile)
	storeCmsSummaryReport()
	return ioutil.ReadFile(reportFile)
}

func TestReportExists(t *testing.T) {
	text, err := getReport()
	if err != nil {
		t.Errorf("Unexpected error: %s", err.Error())
	}
	if len(text) == 0 {
		t.Errorf("No file contents")
	}
}

func TestReportFileContainsCmsData(t *testing.T) {
	text, err := getReport()
	if err != nil {
		t.Errorf("Unexpected error: %s", err.Error())
	}
	var s summary
	err = json.Unmarshal(text, &s)
	if err != nil {
		t.Errorf("Unexpected error: %s", err.Error())
	}
	expectedPosts := 100.0
	if s["posts"] != expectedPosts {
		t.Errorf("\"posts\" got %f, want %f", s["posts"], expectedPosts)
	}
	expectedUsers := 10.0
	if s["users"] != expectedUsers {
		t.Errorf("\"users\" got %f, want %f", s["users"], expectedUsers)
	}
}

func TestReportFileCalculateMeanUsers(t *testing.T) {
	text, err := getReport()
	if err != nil {
		t.Errorf("Unexpected error: %s", err.Error())
	}
	var s summary
	err = json.Unmarshal(text, &s)
	if err != nil {
		t.Errorf("Unexpected error: %s", err.Error())
	}
	expectedMean := 10.0
	if s["mean_posts_per_user"] != expectedMean {
		t.Errorf("\"mean_posts_per_user\" got %f, want %f", s["mean_posts_per_user"], expectedMean)
	}
}
