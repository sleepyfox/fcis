import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CMS {
    private static String REPORT_DIRECTORY = System.getProperty("java.io.tmpdir");
    private static String REPORT_NAME = String.format("cms-%s.json", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE));
    private static File REPORT_FILE = new File(REPORT_DIRECTORY, REPORT_NAME);

    public void storeCmsSummaryReport() {
        try(BufferedWriter writer = new BufferedWriter(new FileWriter(REPORT_FILE))) {
            // TODO
        } catch (IOException e) {
            System.err.println(String.format("Unable to write report %s: %s",
                    REPORT_FILE.getAbsolutePath(), e.getMessage()));
        }
    }
}
