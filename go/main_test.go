package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"testing"

	"github.com/stretchr/testify/require"
)

type summary map[string]float64

func getReport() ([]byte, error) {
	os.Remove(reportFile)
	storeCmsSummaryReport()
	return ioutil.ReadFile(reportFile)
}

func TestReportExists(t *testing.T) {
	text, err := getReport()
	require.NoError(t, err)
	require.NotEqual(t, []byte{}, text)
}

func TestReportFileContainsCmsData(t *testing.T) {
	text, err := getReport()
	require.NoError(t, err)
	var s summary
	err = json.Unmarshal(text, &s)
	require.NoError(t, err)
	require.Equal(t, 100.0, s["posts"])
	require.Equal(t, 10.0, s["users"])
}

func TestReportFileCalculateMeanUsers(t *testing.T) {
	text, err := getReport()
	require.NoError(t, err)
	var s summary
	err = json.Unmarshal(text, &s)
	require.NoError(t, err)
	require.Equal(t, 10.0, s["mean_posts_per_user"])
}
