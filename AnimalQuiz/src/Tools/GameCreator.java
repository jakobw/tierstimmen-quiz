/*
 * 
 */
package Tools;

import java.io.IOException;
import java.net.URISyntaxException;

import java.util.ArrayList;

import org.xml.sax.SAXException;

import Tools.RandomId;
import XML_DB.AnimalDB;

// TODO: Auto-generated Javadoc
/**
 * The Class GameCreator.
 */
public class GameCreator {
	
	/**
	 * Instantiates a new game creator.
	 */
	public GameCreator() {
		
	}
	
	/**
	 * Creates the game.
	 *
	 * @return the string
	 * @throws URISyntaxException the URI syntax exception
	 */
	@SuppressWarnings("finally")
	public String createGame() throws URISyntaxException{
		String result = "";
		String XMLoutput = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+ System.getProperty("line.separator") + "<Questions>" ;
		int correct = 0;
		int wrong1 = 0;
		int wrong2 = 0;
		int wrong3 = 0;
		
		AnimalDB animalDB = new AnimalDB();
		
		for ( int qNumber = 1; qNumber <= 10; qNumber ++ ) {
			String tempQuestion = null;
			RandomId rid = new RandomId();
			ArrayList<Integer> Ids = rid.getRandomNum();
			correct = rid.createCorrectAnswer(Ids);
			wrong1 = Ids.remove(0);
			wrong2 = Ids.remove(0);
			wrong3 = Ids.remove(0);
			
			
			tempQuestion = animalDB.getQuestion(correct, wrong1, wrong2, wrong3, qNumber);
			XMLoutput = XMLoutput + System.getProperty("line.separator") + tempQuestion;
			
		}
		
	
		animalDB.closeAnimalDB();
		boolean isValid = false;
		XMLoutput = XMLoutput + System.getProperty("line.separator") +"</Questions>";
		XMLValidator xval = new XMLValidator();
		try {
			isValid = xval.validate(XMLoutput);
			if (isValid) {
				result = XMLoutput;
			}
		} catch (IOException | SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "<Error><ErrorMessage>Validation fehlgeschlagen</ErrorMessage></Error>";
		}
		finally {
			return result;
		}
		
		
		
		
		
	}

}
