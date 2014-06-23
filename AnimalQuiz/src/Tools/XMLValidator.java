package Tools;


import java.io.IOException;
import java.io.StringReader;
import java.net.URISyntaxException;
import java.net.URL;










import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;

import javax.xml.validation.SchemaFactory;





import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

public class XMLValidator {
	
	public boolean validate(String inputXml ) throws IOException, SAXException {
			  // build the schema
		boolean isValid = false;
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		URL url = loader.getResource("..\\questions.xml");
		String XSDsource = null;
		try {
			XSDsource = url.toURI().toString();
		} catch (URISyntaxException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		System.out.println(XSDsource);
		
		SAXParserFactory factory = SAXParserFactory.newInstance();
		factory.setValidating(false);
		factory.setNamespaceAware(true);

		SchemaFactory schemaFactory = 
		    SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");

		try {
			factory.setSchema(schemaFactory.newSchema(
			    new Source[] {new StreamSource(XSDsource)}));
		} catch (SAXException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		SAXParser parser = null;
		try {
			parser = factory.newSAXParser();
		} catch (ParserConfigurationException | SAXException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		XMLReader reader = null;
		try {
			reader = parser.getXMLReader();
		} catch (SAXException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
			reader.parse(new InputSource(new StringReader(inputXml)));
			isValid = true;
	
				
			  

			 
			return isValid;
			}

}
