package Binary;

// "commons-codec-1.3.jar"
import org.apache.commons.codec.binary.Base64;

import java.util.Arrays;

public class EncodeBase64 {
	public static void main(String[] args) {
		String name = "12304";
		System.out.println(name);

		// 1. Convert String To 8-bit Bytes Array Format
		byte[] base8Bytes = name.getBytes();
		System.out.println(Arrays.toString(base8Bytes));

		// 2. Covert The 8-bit Bytes To 64-bit Bytes
		byte[] base64Bytes = Base64.encodeBase64(base8Bytes);
		System.out.println(Arrays.toString(base64Bytes));

		// 3. Covet 64-bit Bytes To String
		String base64String = new String(base64Bytes);
		System.out.println(base64String);
	}
}


/**
 * byte  8-bit 
 * short 16-bit 
 * int   32-bit 
 * long  64
 * */
