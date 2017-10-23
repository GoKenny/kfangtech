package Selenium;

/**Need 2 jars: selenium-java & selenium-server (standalone)  */
import static org.junit.Assert.fail;

import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Test_CSpage {

	private WebDriver driver;
	private String baseUrl;
	private StringBuffer verificationErrors = new StringBuffer();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.firefox.bin", "D:\\Program Files\\Mozilla Firefox\\firefox.exe");

		driver = new FirefoxDriver();
		baseUrl = "http://www.kfangtech.com/";
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}

	@Test
	public void test() throws Exception {
		driver.get(baseUrl + "/login.jsp?from=spending");
		driver.findElement(By.cssSelector("input.inputStyle.logInButton")).click();
		// ERROR: Caught exception [ERROR: Unsupported command [waitForPopUp | _self | 30000]]
		driver.findElement(By.id("addOneEntry")).click();
		driver.findElement(By.id("nextMonth")).click();
		driver.findElement(By.id("nextMonth")).click();
		driver.findElement(By.id("nextMonth")).click();
		driver.findElement(By.id("lastMonth")).click();
		driver.findElement(By.id("lastMonth")).click();
		driver.findElement(By.id("linkTitle")).click();
		driver.findElement(By.id("nextMonth")).click();
		driver.findElement(By.id("lastMonth")).click();
		driver.findElement(By.id("addOneEntry")).click();
		driver.findElement(By.id("checkTheMap")).click();
	}

	@After
	public void tearDown() throws Exception {
		driver.quit();
		String verificationErrorString = verificationErrors.toString();
		if (!"".equals(verificationErrorString)) {
			fail(verificationErrorString);
		}
	}

}
