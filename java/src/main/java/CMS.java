import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Scanner;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.time.format.DateTimeFormatter.ISO_DATE;

public class CMS {
    private static final String REPORT_DIRECTORY = System.getProperty("java.io.tmpdir");
    private static final String REPORT_NAME = String.format("cms-%s.json", LocalDateTime.now().format(ISO_DATE));
    private static final File REPORT_FILE = new File(REPORT_DIRECTORY, REPORT_NAME);

    public void storeCmsSummaryReport() {
        String postsText = "";
        try {
            URL postsUrl = new URL("https://jsonplaceholder.typicode.com/posts");
            try (Scanner scanner = new Scanner(postsUrl.openStream(), UTF_8)) {
                scanner.useDelimiter("\\A");
                postsText = scanner.hasNext() ? scanner.next() : "";
            }
        } catch (IOException ex) {
            // TODO
        }


        try(BufferedWriter writer = new BufferedWriter(new FileWriter(REPORT_FILE))) {
            // TODO
        } catch (IOException e) {
            System.err.printf("Unable to write report %s: %s%n",
                    REPORT_FILE.getAbsolutePath(), e.getMessage());
        }
    }
}
