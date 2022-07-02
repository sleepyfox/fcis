import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.time.format.DateTimeFormatter.ISO_DATE;

public class CMS {
    private static final String REPORT_DIRECTORY = System.getProperty("java.io.tmpdir");
    private static final String REPORT_NAME = String.format("cms-%s.json", LocalDateTime.now().format(ISO_DATE));
    private static final File REPORT_FILE = new File(REPORT_DIRECTORY, REPORT_NAME);

    public void storeCmsSummaryReport() {
        System.out.println("Getting CMS data");
        String postsText = "";
        try {
            URL postsUrl = new URL("https://jsonplaceholder.typicode.com/posts");
            try (Scanner scanner = new Scanner(postsUrl.openStream(), UTF_8)) {
                scanner.useDelimiter("\\A");
                postsText = scanner.hasNext() ? scanner.next() : "";
            }
        } catch (IOException ex) {
            System.err.printf("No valid JSON response from CMS, error %s", ex.getMessage());
        }

        JSONArray posts = new JSONArray(postsText);
        System.out.printf("CMS data has %d records%n", posts.length());

        Set<Integer> userIds = new HashSet<>();
        posts.forEach(post -> userIds.add(((JSONObject)post).getInt("userId")));

        try(BufferedWriter writer = new BufferedWriter(new FileWriter(REPORT_FILE))) {
            int postCount = posts.length();
            int userCount = userIds.size();
            String summary = String.format("{ \"posts\": %d, \"users\": %d, \"mean_posts_per_user\": %d }",
                    postCount, userCount, Math.round((float)postCount / (float)userCount));
            writer.write(summary);
        } catch (IOException e) {
            System.err.printf("Unable to write report %s: %s%n",
                    REPORT_FILE.getAbsolutePath(), e.getMessage());
        }
        System.out.println("Wrote CMS report");
    }

    public static void main(String[] args) {
        new CMS().storeCmsSummaryReport();
    }
}
