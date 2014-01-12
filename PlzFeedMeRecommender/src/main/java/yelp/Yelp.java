package yelp;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import javax.json.Json;
import javax.json.stream.JsonParser;
import javax.json.stream.JsonParser.Event;

import org.apache.http.client.ClientProtocolException;
import org.scribe.builder.ServiceBuilder;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Token;
import org.scribe.model.Verb;
import org.scribe.oauth.OAuthService;
import org.apache.commons.lang.StringUtils;

/**
* Accessing the Yelp API.
*/
public class Yelp {

	 OAuthService service;
	 Token accessToken;
	 public static BufferedWriter writer;
	 static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	 static final String DB_URL = "jdbc:mysql://sql.mit.edu/quanquan+plzfeedme";
	private static final Object[] Array = null;

	 //Credentials
	 private final String USER = "quanquan";
	 private final String PASSWORD = "hof9924ne@!";
	 
	 //OrderIn Info
	 private String orderInURL = "https://r-test.ordr.in";
	 private final String privateKey = "dsrtGpE_h_-K9jX7nPKUcK80IJDQhQd3XGTSvGQ3LWQ";
	 
	 /**
	  * Setup the Yelp API OAuth credentials.
	  *
	  * OAuth credentials are available from the developer site, under Manage API access (version 2 API).
	  *
	  * @param consumerKey Consumer key
	  * @param consumerSecret Consumer secret
	  * @param token Token
	  * @param tokenSecret Token secret
	  */
	 public Yelp(String consumerKey, String consumerSecret, String token, String tokenSecret) {
		   this.service = new ServiceBuilder().provider(YelpApi2.class).apiKey(consumerKey).apiSecret(consumerSecret).build();
		   this.accessToken = new Token(token, tokenSecret);
	 }

	 /**
	  * Search with term and location.
	  *
	  * @param term Search term
	  * @param latitude Latitude
	  * @param longitude Longitude
	  * @return JSON string response
	  */
	 public String search(String term, String location, double latitude, double longitude) {
		   OAuthRequest request = new OAuthRequest(Verb.GET, "http://api.yelp.com/v2/search");
		   if (term != null)
			   request.addQuerystringParameter("term", term);
		   if (location != null) 
			   request.addQuerystringParameter("location", location);
		   if (latitude != -1000 && longitude != -1000)
			   request.addQuerystringParameter("ll", latitude + "," + longitude);
		   this.service.signRequest(this.accessToken, request);
		   Response response = request.send();
		   return response.getBody();
	 }
	 
	 public void getYelpRatings(Yelp yelp, String file) {
		 try {
			BufferedReader in = new BufferedReader(new FileReader(file));
			String str;
			writer = new BufferedWriter(new FileWriter("YelpResult.txt"));
			while ((str = in.readLine()) != null) {
				String response = yelp.search(str, "320 Memorial Drive, Cambridge, MA", -1000, -1000);
				String name = "";
				String rating = "";
				InputStream is = new ByteArrayInputStream(response.getBytes());
				JsonParser parser = Json.createParser(is);
				while (parser.hasNext()) {
					Event e = parser.next();
					if (e == Event.KEY_NAME) {
						//writer.write(parser.getString());
						if (parser.getString().equals("rating") && parser.hasNext()) {
							if (!name.equals("") && !rating.equals("")) { 
								writer.write(name + "\t" + rating + "\n");
								name = "";
								rating = "";
							}
							parser.next();
							rating = parser.getString();
						}
						else if (parser.getString().equals("name") && parser.hasNext()) {
							parser.next();
							String processedName = str.replaceAll("\\s+","").toLowerCase();
							String processedMatch = parser.getString().replaceAll("\\s+","").toLowerCase();
							if (StringUtils.getLevenshteinDistance(processedName, processedMatch) < 5) {
								name = parser.getString();
							} else {
								rating = "";
								name = "";
							}
						}
					}
				}
				if (!name.equals("") && !rating.equals("")) { 
					writer.write(name + "\t" + rating + "\n");
					name = "";
					rating = "";
				}
			}
			in.close();
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
	 }
	 
	 public String findYelpRating(Yelp yelp, String name, String addr) {
		 String response = yelp.search(name + " " + addr, "320 Memorial Drive, Cambridge, MA", -1000, -1000);
		 InputStream is = new ByteArrayInputStream(response.getBytes());
		 JsonParser parser = Json.createParser(is);
		 while (parser.hasNext()) {
			Event e = parser.next();
			if (e == Event.KEY_NAME) {
				//writer.write(parser.getString());
				if (parser.getString().equals("rating") && parser.hasNext()) {
					parser.next();
					return parser.getString();
				}
			}
		}
		return "3.055";
	 }
	
	 public void insertFood(Yelp yelp, String datetime, String zip, String city, String addr) {
		 String listURL = orderInURL+"/dl/" + datetime + "/" + zip + "/" + city + "/" + addr + "?_auth=1," + privateKey; 
		 try {
			Class.forName(JDBC_DRIVER);
			InputStream is = new URL(listURL).openStream();
			JsonParser parser = Json.createParser(is);
			writer = new BufferedWriter(new FileWriter("OrderInRestaurants.txt"));
			
			String name = "";
			String id = "";
			String address = "";
			
			Connection conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);
			Statement stmt = conn.createStatement();
			stmt.executeUpdate("TRUNCATE foods");
			
			while (parser.hasNext()) {
				 Event e = parser.next();
				 if (e == Event.KEY_NAME) {
					 //writer.write(parser.getString());
					 if (parser.getString().equals("na") && parser.hasNext()) {
						 if (name.equals("")) {
							 parser.next();
							 name = parser.getString();
						 }
					 } else if (parser.getString().equals("is_delivering") && parser.hasNext()) {
						 parser.next();
						 if (parser.getString().equals("0")) 
							 id = "";
					 } else if (parser.getString().equals("id") && parser.hasNext()) {
						 if (!name.equals("") && !id.equals("") && !id.equals("186")) {
							 String rating = findYelpRating(yelp, name, address);
							 String menuURL = orderInURL+"/rd/" + id + "?_auth=1," + privateKey; 
							 InputStream foodis = new URL(menuURL).openStream();
							 JsonParser foodparser = Json.createParser(foodis);
							 
							 String foodName = "";
							 String descrip = "";
							 String price = "";
							 
							 HashMap<String, Boolean> cruis = new HashMap<String, Boolean>();
							 
							 while (foodparser.hasNext()) {
								 Event evt = foodparser.next();
								 if (evt == Event.KEY_NAME) {
									 if(foodparser.getString().equals("cuisine") && foodparser.hasNext()) {
										 foodparser.next();
										 Event p = foodparser.next();
										 while (p != Event.START_ARRAY && p != Event.END_ARRAY) {
											 cruis.put(foodparser.getString(), true);
											 p = foodparser.next();
										 }
									 } else if(foodparser.getString().equals("descrip")) {
										 if (foodName != "") {
											 String columns = "(rest_id, rest_name, rating, food_name, food_descrip, food_price,";
											 ArrayList <String> keys = new ArrayList<String>();
											 for (String k : cruis.keySet()) {
												 String insertKey = k.replaceAll(" ", "_");
												 if (k.equals("Gluten - Free"))
													 insertKey = "Gluten_Free";
												 columns = columns + insertKey + ",";
												 keys.add(k);
											 }
											 columns = columns.substring(0, columns.length()-1) + ")";
											 name = name.replaceAll("'", "");
											 String values = "(" + "'" + id + "', " + "'" + name + "', " + Float.parseFloat(rating) + ", " + "'" + foodName + "', " + "'" + descrip + "', " + Double.parseDouble(price) + ",";
											 for (String key: keys) {
												 values = values + cruis.get(key) + ",";
											 }
											 values = values.substring(0, values.length()-1) + ")";
											 String sql = "INSERT INTO foods " + columns +
												        " VALUES " + values;
											 System.out.println(sql);
											 stmt.executeUpdate(sql);
										 }
										 foodparser.next();
										 descrip = foodparser.getString();
										 descrip = descrip.replaceAll("'", "");
									 } else if(foodparser.getString().equals("name")) {
										 foodparser.next();
										 foodName = foodparser.getString();
										 foodName = foodName.replaceAll("'", "");
									 } else if(foodparser.getString().equals("price")) {
										 foodparser.next();
										 price = foodparser.getString();
									 }
								 }
							 }
						 } else {
							 name = "";
							 id = "";
						 }
						 parser.next();
						 id = parser.getString();
					 } else if (parser.getString().equals("addr") && parser.hasNext()) {
						 parser.next();
						 address = parser.getString();
					 }
				 }
			 }
			 if (!name.equals("") && !id.equals("")) {
				 writer.write(name + "\n");
				 name = "";
			 }
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	 }
	 
	 public ResultSet makeRecommendations(HashMap<String, Object[]> args) {
				try {
					Class.forName(JDBC_DRIVER);
					
					Connection conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);
					Statement stmt = conn.createStatement();
					
					String sql = "SELECT * FROM foods WHERE ";
					
					if (args.get("priceRange") != null) {
						Float[] priceRange = (Float[]) args.get("priceRange");
						sql = sql + "food_price >= " + priceRange[0].intValue() + " AND " + "food_price<= " + priceRange[1].intValue(); 
					} else if (args.get("noFoodFrom") != null) {
						for (String country: (String[]) args.get("noFoodFrom")) {
							sql = sql + " AND " + country + "= 0";
						}
					} /*else if (args.get("noFoodType") != null) {
						for (String food: (String[]) args.get("noFoodType")) {
							
						}
					}*/
					//sql = sql + "ORDER BY rating DESC limit 10";
					System.out.println(stmt.executeQuery(sql).getFetchSize());
					return stmt.executeQuery(sql);
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return null;
	 }
	 
	 public static void main(String[] args) {
		// Update tokens here from Yelp developers site, Manage API access.
		String consumerKey = "oI3F8RQDv-DfFQ5ZcEGu6w";
		String consumerSecret = "Ya2OKkCcAFHPMirb5ilRrDqac_o";
		String token = "nLFfhrdl_Ri71ukuGzFZ5zMgYywjcc08";
		String tokenSecret = "t5VU8y82juCbeIy4fHNAI8cnO78";

		Yelp yelp = new Yelp(consumerKey, consumerSecret, token, tokenSecret);
		
		String publicKey = "cMLLju6kcObCipgIikk_ahHyYuSKrS6RN59eOOXy7BU";
		String privateKey = "dsrtGpE_h_-K9jX7nPKUcK80IJDQhQd3XGTSvGQ3LWQ";
	
		OrderIn orderin = new OrderIn(publicKey, privateKey);
		orderin.parseJson("ASAP", "02139", "Cambridge", "320 Memorial Drive");
		//yelp.insertFood(yelp, "1-12+4:30", "02139", "Cambridge", "320 Memorial Drive");
		HashMap<String, Object[]> arguments = new HashMap<String, Object[]>();
		Float[] priceRange = {new Float(10), new Float(20)};
		arguments.put("priceRange", priceRange);
		yelp.makeRecommendations(arguments);
		
		   
		yelp.getYelpRatings(yelp, "OrderInRestaurants.txt");
	 }
}