package XML;

/**
 * 
 * Note: DOM Parser is slow and consumes a lot of memory when it loads an XML document
 * 
 * SAX parser is faster and use less memory
 * 
 * Reference: 	http://www.mkyong.com/java/how-to-read-xml-file-in-java-dom-parser/
 * 
 * 
 * */

import java.io.File;
import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class SAXReadXMLapp {

	public static void main(String[] args) throws SAXException, IOException, ParserConfigurationException {

		// 1. Locate The XML File
		File fXmlFile = new File("src/main/resources/TestingFiles/someXML.xml");
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(fXmlFile);
		doc.getDocumentElement().normalize();

		System.out.println("Root element: " + doc.getDocumentElement().getNodeName());

		// 2. Get Elements By Tag Names
		NodeList nodeList = doc.getElementsByTagName("staff");

		System.out.println("----------------------------");

		for (int i = 0; i < nodeList.getLength(); i++) {

			Node theNode = nodeList.item(i);

			System.out.println("\nCurrent Element: \t" + theNode.getNodeName() + "\n" );

			if (theNode.getNodeType() == Node.ELEMENT_NODE) {

				Element theeElement = (Element) theNode;

				System.out.println("Staff id :\t\t" + theeElement.getAttribute("id"));
				System.out.println("First Name: \t\t" + theeElement.getElementsByTagName("firstname").item(0).getTextContent());
				System.out.println("Last Name: \t\t" + theeElement.getElementsByTagName("lastname").item(0).getTextContent());
				System.out.println("Nick Name: \t\t" + theeElement.getElementsByTagName("nickname").item(0).getTextContent());
				System.out.println("Salary: \t\t" + theeElement.getElementsByTagName("salary").item(0).getTextContent());
			}
		}
		
		
		
		
		
		
		
		
		SAXParserFactory factory = SAXParserFactory.newInstance();
		SAXParser saxParser = factory.newSAXParser();
	 
		DefaultHandler handler = new DefaultHandler() {
	 
		boolean bfname = false;
		boolean blname = false;
		boolean bnname = false;
		boolean bsalary = false;
	 
		public void startElement(String uri, String localName,String qName) throws SAXException {
	 
			System.out.println("Start Element :" + qName);
	 
			if (qName.equalsIgnoreCase("FIRSTNAME")) {
				bfname = true;
			}
	 
			if (qName.equalsIgnoreCase("LASTNAME")) {
				blname = true;
			}
	 
			if (qName.equalsIgnoreCase("NICKNAME")) {
				bnname = true;
			}
	 
			if (qName.equalsIgnoreCase("SALARY")) {
				bsalary = true;
			}
	 
		}
	 
		public void endElement(String uri, String localName,
			String qName) throws SAXException {
	 
			System.out.println("End Element :" + qName);
	 
		}
	 
		public void characters(char ch[], int start, int length) throws SAXException {
	 
			if (bfname) {
				System.out.println("First Name : " + new String(ch, start, length));
				bfname = false;
			}
	 
			if (blname) {
				System.out.println("Last Name : " + new String(ch, start, length));
				blname = false;
			}
	 
			if (bnname) {
				System.out.println("Nick Name : " + new String(ch, start, length));
				bnname = false;
			}
	 
			if (bsalary) {
				System.out.println("Salary : " + new String(ch, start, length));
				bsalary = false;
			}
	 
		}
	 
	    };
	 
	       saxParser.parse("src/main/resources/TestingFiles/someXML.xml", handler);
	 
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

	}

}
