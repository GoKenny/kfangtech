package Encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class FilesCenter {

	/** Write Object To A File */
	public void writeToFile(String fileName, Object object) throws Exception {

		FileOutputStream fileOutputStream = null;
		ObjectOutputStream objectOutputStream = null;

		try {

			// 1. Make File
			fileOutputStream = new FileOutputStream(new File(fileName));
			objectOutputStream = new ObjectOutputStream(fileOutputStream);

			// 2. Write Object To The File
			objectOutputStream.writeObject(object);
			objectOutputStream.flush();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			// 3. Close Them
			if (objectOutputStream != null)
				objectOutputStream.close();
			if (fileOutputStream != null)
				fileOutputStream.close();

		}
	}

	/** Read Object Stored In A File */
	public Object readEncriptedFile(String fileName) throws Exception {

		FileInputStream fileInputStream = null;
		ObjectInputStream objectInputStream = null;
		Object object = null;

		try {

			// 1. Open The File
			fileInputStream = new FileInputStream(new File(fileName));
			objectInputStream = new ObjectInputStream(fileInputStream);

			// 2. Read The Object In The File
			object = objectInputStream.readObject();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			// 3. Close Them
			if (objectInputStream != null)
				objectInputStream.close();
			if (fileInputStream != null)
				fileInputStream.close();

		}

		// 4. Return The Object
		return object;
	}

}
