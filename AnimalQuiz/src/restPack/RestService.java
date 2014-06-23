package restPack;

import java.net.URISyntaxException;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import Tools.GameCreator;



// TODO: Auto-generated Javadoc
/**
 * The Class RestService.
 */
@Path("/getGame")
public class RestService {
	
	  /**
  	 * Gets the game xml.
  	 *
  	 * @return the game xml
  	 */
  	@GET
	  @Produces(MediaType.TEXT_XML)
	  public String getGameXML() {

	
		  String XMLresult = null;
		  GameCreator gc = new GameCreator(); 
		
		  try {
			XMLresult = gc.createGame();
			
			
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   
	    	return XMLresult;
	 
	  }

}
