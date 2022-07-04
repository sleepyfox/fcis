import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;

import static java.time.format.DateTimeFormatter.ISO_DATE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CMSTest {
    private static final String REPORT_DIRECTORY = System.getProperty("java.io.tmpdir");
    private static final String REPORT_NAME = String.format("cms-%s.json", LocalDateTime.now().format(ISO_DATE));
    private static final File REPORT_FILE = new File(REPORT_DIRECTORY, REPORT_NAME);

    @BeforeAll
    public static void run_cms() {
        REPORT_FILE.delete();
        new CMS().storeCmsSummaryReport();
    }

    @Test
    public void cms_writes_report_file() {
        assertTrue(REPORT_FILE.exists(),
                String.format("Report must exist: %s", REPORT_FILE.getAbsolutePath()));
    }

    @Test
    public void report_file_contains_cms_data() throws IOException {
        JSONObject json = new JSONObject(Files.readString(REPORT_FILE.toPath()));
        assertEquals(100, json.getInt("posts"), "posts should be 100");
        assertEquals(10, json.getInt("users"), "users should be 10");
    }

    @Test
    public void calculate_mean_users() throws IOException {
        JSONObject json = new JSONObject(Files.readString(REPORT_FILE.toPath()));
        assertEquals(100, json.getInt("posts"), "posts should be 100");
    }
}
