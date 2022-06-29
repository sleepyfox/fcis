import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CMSTest {
    private static final String REPORT_DIRECTORY = System.getProperty("java.io.tmpdir");
    private static final String REPORT_NAME = String.format("cms-%s.json", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE));
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
}
