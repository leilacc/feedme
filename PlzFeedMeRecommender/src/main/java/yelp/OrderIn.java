package yelp;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;

import javax.json.Json;
import javax.json.stream.JsonParser;
import javax.json.stream.JsonParser.Event;

import org.apache.http.client.ClientProtocolException;

public class OrderIn {
	String publicKey;
	String privateKey;
	private String orderInURL = "https://r-test.ordr.in";
	private BufferedWriter writer;
	
	public OrderIn(String publicKey, String privateKey) {
		this.publicKey = publicKey;
		this.privateKey = privateKey;
	}
	
	 /**
	  * Parses JSON responses from OrderIn
	  * @param args
	  */
	 public void parseJson(String datetime, String zip, String city, String addr) {
		 String listURL = orderInURL+"/dl/" + datetime + "/" + zip + "/" + city + "/" + addr + "?_auth=1," + this.privateKey;
		 try {
			 InputStream is = new URL(listURL).openStream();
			 JsonParser parser = Json.createParser(is);
			 writer = new BufferedWriter(new FileWriter("OrderInRestaurants.txt"));
			 String name = "";
			 while (parser.hasNext()) {
				 Event e = parser.next();
				 if (e == Event.KEY_NAME) {
					 //writer.write(parser.getString());
					 if (parser.getString().equals("na") && parser.hasNext()) {
						 if (!name.equals("")) {
							 writer.write(name + "\n");
							 name = "";
						 }
						 parser.next();
						 name = parser.getString();
					 }
					 else if (parser.getString().equals("is_delivering") && parser.hasNext()) {
						 parser.next();
						 if (parser.getString().equals("0")) 
							 name = "";
					 }
				 }
			 }
			 if (!name.equals("")) {
				 writer.write(name + "\n");
				 name = "";
			 }
			 writer.close();
		 } catch (MalformedURLException e) {
			 e.printStackTrace();
		 } catch (IOException e) {
			 e.printStackTrace();
		 } 
	 }
	
	public String deliveryList(String datetime, String zip, String city, String addr) throws ClientProtocolException, IOException {
		String listURL = orderInURL+"/dl/" + datetime + "/" + zip + "/" + city + "/" + addr + "?_auth=1," + this.privateKey;
		InputStream is = new URL(listURL).openStream();
	    try {
	      BufferedReader rd = new BufferedReader(
	              new InputStreamReader(is, Charset.forName("UTF-8")));
	      String jsonText = readAll(rd);
	      return jsonText;
	    } finally {
	      is.close();
	    }
	}
	
	private static String readAll(Reader rd) throws IOException {
	    StringBuilder sb = new StringBuilder();
	    int cp;
	    while ((cp = rd.read()) != -1) {
	      sb.append((char) cp);
	    }
	    return sb.toString();
	}
}
