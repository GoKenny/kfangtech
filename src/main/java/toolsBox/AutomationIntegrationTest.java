package toolsBox;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class AutomationIntegrationTest {

	public static void main(String[] args) throws InterruptedException {

		int pauseMilliSeconds = 2000;

		// Optional: Point The Driver To My Installation Folder
//		System.setProperty("webdriver.firefox.bin", "D:\\Program Files\\Mozilla Firefox\\firefox.exe");
		WebDriver driver = new FirefoxDriver();

		// Maximize The Window 
		driver.manage().timeouts().implicitlyWait(3000, TimeUnit.SECONDS);
		driver.manage().window().maximize();
		
		// 1. Login Page
		driver.get("http://www.kfangtech.com");
		Thread.sleep(pauseMilliSeconds);
		
		driver.findElement(By.id("downArrow")).click();
		Thread.sleep(pauseMilliSeconds + 1500);
		
		driver.findElement(By.id("loginText")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.cssSelector("input.inputStyle.logInButton")).click();
		Thread.sleep(pauseMilliSeconds);
		
		// 2. Spending
		driver.findElement(By.id("addOneEntry")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("nextMonth")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("lastMonth")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("lastMonth")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("checkTheMap")).click();
		Thread.sleep(pauseMilliSeconds + 2000);

		// 3. Schedule
		System.out.println("finding The Link");
		driver.findElement(By.id("theLink")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("nextMonth")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("lastMonth")).click();
		Thread.sleep(pauseMilliSeconds);

		driver.findElement(By.id("addOneEntry")).click();
		Thread.sleep(pauseMilliSeconds + 4000);

		driver.quit();

	}

}
