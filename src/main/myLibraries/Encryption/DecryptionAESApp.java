package Encryption;

import javax.crypto.Cipher;
import javax.crypto.SealedObject;
import javax.crypto.SecretKey;

public class DecryptionAESApp {

	public static void main(String[] args) throws Exception {

		String text;
		
		FilesCenter decriptionApp = new FilesCenter();

		// 1. Get The Key Object From The File
		SecretKey key = (SecretKey) decriptionApp.readEncriptedFile("src/main/resources/Encryption/key.dat");
		
		// 2. Read The SealedObject(Encrypted Message) From The File
		SealedObject sealedObject = (SealedObject) decriptionApp.readEncriptedFile("src/main/resources/Encryption/sealed.dat");

		// 3. Decrypt The Message With The Key
		String algorithmName = sealedObject.getAlgorithm();
		Cipher cipher = Cipher.getInstance(algorithmName);
		cipher.init(Cipher.DECRYPT_MODE, key);
		text = (String) sealedObject.getObject(cipher);
		System.out.println(text);

	}
	
}
