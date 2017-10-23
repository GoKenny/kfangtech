package Email;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class GmailApp {
	
	public static void main(String[] args) throws AddressException, MessagingException {
		
		// 1. My Gmail Account And Password
		final String username = "kuinai.fang@gmail.com";
		final String password = "kuinai8999";
 
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
 
		Message message = new MimeMessage(session);
		
		// 2. From and To
		message.setFrom(new InternetAddress("from-email@gmail.com"));
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("kuinai.fang@unb.ca"));
		message.addRecipients(Message.RecipientType.CC, InternetAddress.parse("a8fq2@unb.ca"));
		
		// 3. Subject
		message.setSubject("Testing My Gmail Spam App");
		
		// 4. The Message
		message.setText(
				"Dear Mail Crawler, \n"
				+ "\n "
				+ "Testing My Spam Emails :) ");
 
		Transport.send(message);
 
		System.out.println("The Mail Is Sent :) ");
	}
	
}
