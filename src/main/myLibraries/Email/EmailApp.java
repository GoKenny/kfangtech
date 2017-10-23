package Email;

public class EmailApp {
	public static void main(String[] args) {

		// Send 1 Time
		Email rimMail = new Email();
		rimMail.sendEmail();
		
		// Send Multiple Emails
		Emails e=new Emails("kuinai.fang@gmail.com","kuinai.fang@unb.ca");
		
		e.sendEmailWithAttachment("Email With Attachment01","Sending SPAM Test01","/home/kfang/Desktop/Something");
	
		e.sendEmail("No Attchment", "No Attachment");

	}

}
