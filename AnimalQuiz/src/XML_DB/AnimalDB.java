package XML_DB;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

import org.basex.*;
import org.basex.core.cmd.*;
import org.basex.server.*;

// TODO: Auto-generated Javadoc
/**
 * The Class AnimalDB.
 */
public class AnimalDB {
	
	/** The session. */
	private ClientSession session;
	
	/** The server. */
	private BaseXServer server;
	
	/** The D bname. */
	private String DBname = "AnimalDB";
	
	/** The XM lsource. */
	private String XMLsource = "/xmlDocs/animals.xml";
	
	/**
	 * Instantiates a new animal db.
	 *
	 * @throws URISyntaxException the URI syntax exception
	 */
	public AnimalDB() throws URISyntaxException {
		try {
			server = new BaseXServer();
			session = new ClientSession("localhost", 1984, "admin", "admin");
			
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			URL url = loader.getResource(".." + File.separator + "animals.xml");
			XMLsource =  url.toURI().toString();
			
			

			session.execute(new CreateDB(DBname, XMLsource));
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		
	}
	
	/**
	 * Gets the question.
	 *
	 * @param correctId the correct id
	 * @param wrongId1 the wrong id1
	 * @param wrongId2 the wrong id2
	 * @param wrongId3 the wrong id3
	 * @param questionnum the questionnum
	 * @return the question
	 */
	public String getQuestion(int correctId, int wrongId1,int wrongId2,int wrongId3,int questionnum) {
		String Question = null;
		String queryString = "<Question number=\""+questionnum+"\"><Correct>"+correctId+"</Correct>{for $x in Animals/Animal where $x/Id="+correctId+" or $x/Id="+wrongId1+" or $x/Id="+wrongId2+" or $x/Id="+wrongId3+" return $x} </Question>";
		
		try {
			Question = session.query(queryString).execute();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		
		return Question;
	}
	
	/**
	 * Close animal db.
	 */
	public void closeAnimalDB(){
		try {
			session.execute(new DropDB(DBname));
			session.close();
			server.stop();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
	}
	

}
