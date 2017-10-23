package SWT;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertyLoader {
	public String getValueFromKey(String key){
		Properties props = new Properties();
		
		try {
			FileInputStream inputStream;
			inputStream = new FileInputStream("configSettings");
			props.load(inputStream);
			inputStream.close();
			return props.getProperty(key);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	public void setPropertyValue(String key, String value){
		// since nothing was specified
		// write a key value pair to config file.
		FileOutputStream out = null;
		FileInputStream fis = null;
		try {
		      Properties props = new Properties();
		      String filename = "configSettings";
		      File f = new File(filename);
		      fis = new FileInputStream(f);
		     
		      props.load(fis);
		      fis.close();

		     
		      props.setProperty(key, value);
		     
		      out = new FileOutputStream(filename);
		     
		      props.store(out,"");
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
		     
		      if (fis != null) {
		            try {
		                  fis.close();
		            } catch (IOException e) {
		                  //don't care
		                  e.printStackTrace();
		            }
		      }
		      if (out != null)
		            try {
		                  out.close();
		            } catch (IOException e) {
		                  //don't care
		                  e.printStackTrace();
		            }
		}
	}
}
