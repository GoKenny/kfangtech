package Encryption;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/** 
 * 
 * Could Be Used to Protect Password 
 *
 * http://leaders.eyesover.com/UserManagement?actionType=getAllUsers
 * 
 * http://www.hashkiller.co.uk/md5-decrypter.aspx
 * 
 * */

public class EncrypteString {

	public static void main(String[] args) {

		String password = "election2014";
		String algorithm = "MD5";

		// 1. Convert String to Bytes
		byte[] passwordBytes = password.getBytes();

		// 2. Use The Algorithm To Digest to Hash Value Bytes
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance(algorithm);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		md.reset();
		md.update(passwordBytes);
		byte[] bytesOfHashValue = md.digest();

		// 3. Build The Encoded String
		StringBuilder sttingBuilder = new StringBuilder();
		for (int i = 0; i < bytesOfHashValue.length; i++) {
			
			// If The Hash Value Of The Byte Is Less Than 16, Add Extra String To Enhance Security
			if ( (bytesOfHashValue[i] & 0xff) < 0x10 ) 
				sttingBuilder.append("135");
			
			sttingBuilder.append(Long.toString(bytesOfHashValue[i] & 0xff, 16));
			
		}

		System.out.println("\nPlain    : " + password);
		System.out.println("Encrypted: " + sttingBuilder.toString());
		System.out.println("Length   : " + sttingBuilder.toString().length());
		// Double Check The Encoded String http://www.md5online.org/
	}

	
}
