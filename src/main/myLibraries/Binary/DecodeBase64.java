package Binary;

import org.apache.commons.codec.binary.Base64;

import java.util.Arrays;

public class DecodeBase64 {
	public static void main(String[] args) {
		String base64String = "a3VpbmFp";

		// 1.Convert String to 64-bit Bytes
		byte[] base64Bytes = base64String.getBytes();
		System.out.println(Arrays.toString(base64Bytes));

		// 2. Covert 64 Bytes to 8-bit Bytes
		byte[] base8Bytes = Base64.decodeBase64(base64Bytes);
		System.out.println(Arrays.toString(base8Bytes));

		// 3. Covert 8-bit Bytes to String
		String decodedString = new String(base8Bytes);
		System.out.println(decodedString);
	}
}