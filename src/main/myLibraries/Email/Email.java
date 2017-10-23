package Email;

import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
// Need The JavaMail API Which is "mail-1.4.6-rc1.jar"
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class Email {

	public void sendEmail() {
		
		String from = "kuinai.fang@gmail.com";
		String to = "kuinai.fang@unb.ca";
		String subject = "SPAM !";
		String bodyText = "This is a SPAM.";
		String filename = "/home/kfang/Desktop/Something";

		Properties properties = new Properties();
		properties.put("mail.smtp.host", "smtp.rim.net");
		properties.put("mail.smtp.port", "25");

		Session session = Session.getDefaultInstance(properties, null);

		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(
					to));
			message.setSubject(subject);
			message.setSentDate(new Date());

			// Set the email message text.
			MimeBodyPart messagePart = new MimeBodyPart();
			messagePart.setText(bodyText);

			// Set the email attachment file
			MimeBodyPart attachmentPart = new MimeBodyPart();
			FileDataSource fileDataSource = new FileDataSource(filename) {
				@Override
				public String getContentType() {
					return "application/octet-stream";
				}
			};
			attachmentPart.setDataHandler(new DataHandler(fileDataSource));
			attachmentPart.setFileName(fileDataSource.getName());

			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messagePart);
			multipart.addBodyPart(attachmentPart);

			message.setContent(multipart);

			Transport.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
