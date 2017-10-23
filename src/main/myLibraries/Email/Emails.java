package Email;

import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class Emails {
	String from;
	String to;

	String subject;
	String bodyText;
	String fileName;

	Properties properties;
	Session session;
	MimeMessage message ;

	// Constructor: 1.Connect to Server; 2.Get "From" and "To"
	public Emails(String from, String to) {
		this.from = from;
		this.to = to;

		properties = new Properties();
		properties.put("mail.smtp.host", "smtp.rim.net");
		properties.put("mail.smtp.port", "25");

		session = Session.getDefaultInstance(properties, null);
		
		message = new MimeMessage(session);
	}

	public void sendEmailWithAttachment(String subject, String bodyText,
			String fileName) {

		this.subject = subject;
		this.bodyText = bodyText;
		this.fileName = fileName;

		try {
			
			message.setFrom(new InternetAddress(from));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			message.setSentDate(new Date());
			
			// Set Subjct
			message.setSubject(subject);

			// Set the email message text.
			MimeBodyPart messagePart = new MimeBodyPart();
			messagePart.setText(bodyText);

			// Set the email attachment file
			MimeBodyPart attachmentPart = new MimeBodyPart();
			FileDataSource fileDataSource = new FileDataSource(fileName) {
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

	public void sendEmail(String subject, String bodyText) {

		this.subject = subject;
		this.bodyText = bodyText;

		try {
			message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			message.setSubject(subject);
			message.setSentDate(new Date());

			// Set the email message text.
			MimeBodyPart messagePart = new MimeBodyPart();
			messagePart.setText(bodyText);

			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messagePart);

			message.setContent(multipart);

			Transport.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
