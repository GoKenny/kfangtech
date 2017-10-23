package Encryption;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SealedObject;
import javax.crypto.SecretKey;

/** 
 *  DES - Data Encryption Standard     -> insecure                  => 56-bit key
 *  AES - Advanced Encryption Standard -> adopted NSA and worldwide => 128-bit hey
 * */
public class EncryptionAESApp {

	public static void main(String[] args) throws Exception {

		String message="Kuinai";
		
		FilesCenter filesCenter = new FilesCenter();

		// 1. Generating A Secret DES or AES Key
		SecretKey key = KeyGenerator.getInstance("AES").generateKey();

		// 2. Save The Secret DES Key Object To A File
		filesCenter.writeToFile("src/main/resources/Encryption/key.dat", key);
		System.out.println(key.toString());
		
		// 3. Encrypt The Message With The Key
		Cipher cipher = Cipher.getInstance("AES");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		SealedObject sealedObject = new SealedObject(message, cipher);

		// 4. Save The Encrypted Message Object To A File
		filesCenter.writeToFile("src/main/resources/Encryption/sealed.dat",sealedObject);
		System.out.println( sealedObject.getObject(key));

	}

}
