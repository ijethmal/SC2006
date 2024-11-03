package com.app1.app.service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.http.HttpHeaders;
import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.app1.app.domain.Event;
import com.app1.app.domain.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.w3c.dom.Document;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import com.app1.app.repo.EventRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.NodeList;
//http imports
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import java.util.logging.Logger;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.util.EntityUtils;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)

public class EventService {

    @Autowired
    public final EventRepo eventRepo;
    public final UserService userService;
    //private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger logger = Logger.getLogger(EventService.class.getName());

    public List<Event> getAllEventsFromAPI() {
        HttpHost targetHost = new HttpHost("api.stb.gov.sg", 443, "https");
        CloseableHttpClient httpclient = HttpClients.createDefault();

        List<Event> eventsList = new ArrayList<>();

        try {
            HttpGet httpget = new HttpGet("/content/events/v2/search?searchType=keyword&searchValues=leisure");
            //httpget.addHeader("ApiEndPointTitle", "Search Leisure Events By Keyword or UUIDs");
            httpget.addHeader("Content-Type", "application/json");
            httpget.addHeader("X-Content-Language", "en");
            httpget.addHeader("X-API-Key", "y44WHNk5pZCCXiVXR4At0iImge3FiwgV");

            logger.info("Executing request " + httpget.getRequestLine());

            HttpResponse response = httpclient.execute(targetHost, httpget);
            HttpEntity entity = response.getEntity();

            StringBuilder jsonString = new StringBuilder();
            BufferedReader rd = new BufferedReader(new InputStreamReader(entity.getContent()));

            String line;
            while ((line = rd.readLine()) != null) {
                jsonString.append(line);
            }

            // Log the JSON response for debugging
            logger.info("API Response: " + jsonString.toString());

            // Parse the JSON response and load into events db
            // Assuming the JSON response contains an array of events
            // You need to implement the parsing logic based on the actual JSON structure

            // Example parsing logic (adjust based on actual JSON structure)
            // JSONArray eventsArray = new JSONArray(jsonString.toString());
            // for (int i = 0; i < eventsArray.length(); i++) {
            //     JSONObject eventObject = eventsArray.getJSONObject(i);
            //     String name = eventObject.getString("name");
            //     String date = eventObject.getString("date");
            //     String time = eventObject.getString("time");
            //     String venue = eventObject.getString("venue");
            //     String description = eventObject.getString("description");
            //     String url = eventObject.getString("url");
            //     logger.info("Event Name: " + name);
            //     logger.info("Event Date: " + date);
            //     logger.info("Event Time: " + time);
            //     logger.info("Event Venue: " + venue);
            //     logger.info("Event Description: " + description);
            //     logger.info("Event URL: " + url);
            //     Event newEvent = new Event();
            //     newEvent.setName(name);
            //     newEvent.setTime(stringToEpoch(date + " " + time));
            //     newEvent.setDetails(description);
            //     newEvent.setFacility(venue);
            //     eventRepo.save(newEvent);
            //     eventsList.add(newEvent);
            //     logger.info("Saved event: " + newEvent.getName() + ", " + newEvent.getTime() + ", " + newEvent.getFacility());
            // }

        } catch (Exception e) {
            e.printStackTrace();
            logger.severe("Error fetching or saving events: " + e.getMessage());
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
                logger.severe("Error closing HttpClient: " + e.getMessage());
            }
        }
        return eventsList;
    }

    public List<Event> getEventFromAPI(String keyword) {
        HttpHost targetHost = new HttpHost("api.stb.gov.sg", 443, "https");
        CloseableHttpClient httpclient = HttpClients.createDefault();

        List<Event> eventsList = new ArrayList<>();

        try {
            String url = "/content/events/v2/search?searchType=keyword&searchValues=" + keyword;
            HttpGet httpget = new HttpGet(url);
            httpget.addHeader("ApiEndPointTitle", "Search Leisure Events By Keyword or UUIDs");
            httpget.addHeader("Content-Type", "application/json");
            httpget.addHeader("X-Content-Language", "en");
            httpget.addHeader("X-API-Key", "y44WHNk5pZCCXiVXR4At0iImge3FiwgV");

            logger.info("Executing request " + httpget.getRequestLine());

            HttpResponse response = httpclient.execute(targetHost, httpget);
            HttpEntity entity = response.getEntity();

            StringBuilder jsonString = new StringBuilder();
            BufferedReader rd = new BufferedReader(new InputStreamReader(entity.getContent()));

            String line;
            while ((line = rd.readLine()) != null) {
                jsonString.append(line);
            }

            // Log the JSON response for debugging
            logger.info("API Response: " + jsonString.toString());

            // Parse the JSON response and load into events db
            // Assuming the JSON response contains an array of events
            // You need to implement the parsing logic based on the actual JSON structure

            // Example parsing logic (adjust based on actual JSON structure)
            // JSONArray eventsArray = new JSONArray(jsonString.toString());
            // for (int i = 0; i < eventsArray.length(); i++) {
            //     JSONObject eventObject = eventsArray.getJSONObject(i);
            //     String name = eventObject.getString("name");
            //     String date = eventObject.getString("date");
            //     String time = eventObject.getString("time");
            //     String venue = eventObject.getString("venue");
            //     String description = eventObject.getString("description");
            //     String url = eventObject.getString("url");
            //     logger.info("Event Name: " + name);
            //     logger.info("Event Date: " + date);
            //     logger.info("Event Time: " + time);
            //     logger.info("Event Venue: " + venue);
            //     logger.info("Event Description: " + description);
            //     logger.info("Event URL: " + url);
            //     Event newEvent = new Event();
            //     newEvent.setName(name);
            //     newEvent.setTime(stringToEpoch(date + " " + time));
            //     newEvent.setDetails(description);
            //     newEvent.setFacility(venue);
            //     eventRepo.save(newEvent);
            //     eventsList.add(newEvent);
            //     logger.info("Saved event: " + newEvent.getName() + ", " + newEvent.getTime() + ", " + newEvent.getFacility());
            // }

        } catch (Exception e) {
            e.printStackTrace();
            logger.severe("Error fetching or saving events: " + e.getMessage());
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
                logger.severe("Error closing HttpClient: " + e.getMessage());
            }
        }
        return eventsList;
    }

    public Page<Event> getEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("time").descending());
        return eventRepo.findAll(pageable);
    }

    public Event getEvent(String id) {
        return eventRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find event"));
    }

    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    public Event deleteEvent(Event event){
        eventRepo.deleteById(event.getId());
        return event;
    }

    public void deleteAllEvent(){
        eventRepo.deleteAll();
    }

    public Event updateEvent(String id, Event event) {
        Event oEvent = getEvent(id);
        if (event.getTime() != 0) oEvent.setTime(event.getTime());
        if (event.getDetails() != null) oEvent.setDetails(event.getDetails());
        //if (event.getAttendees() != null) oEvent.setAttendees(event.getAttendees());
        if (event.getNumAttendees() != 0) oEvent.setNumAttendees(event.getNumAttendees());
        if (event.getFacility() != null) oEvent.setFacility(event.getFacility());
        eventRepo.save(oEvent);
        return oEvent;
    }

    public void addAttendee(String eventId, String userId) throws Exception{
        Event event = getEvent(eventId);
        User user = userService.getUser(userId);
        HashMap<String, Integer> attendees = event.getAttendees();
        if (attendees == null) attendees = new HashMap<>();
        if (attendees.get(userId) != null) throw new Exception("User is already a confirmed attendee");
        else {
            attendees.put(userId, 1);
            event.setAttendees(attendees);
            event.setNumAttendees(event.getNumAttendees() + 1);
            // userService.addEvent (to be implemented)
            eventRepo.save(event);
        }
    }

    public void removeAttendee(String eventId, String userId) throws Exception{
        Event event = getEvent(eventId);
        HashMap<String, Integer> attendees = event.getAttendees();
        if (attendees.get(userId) != null){
            attendees.remove(userId);
            event.setAttendees(attendees);
            event.setNumAttendees(event.getNumAttendees() - 1);
            // userService.removeEvent (to be implemented)
            eventRepo.save(event);
        } else throw new Exception("User not found");
    }

    public static String epochToString(long epoch){
        String date = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date (epoch*1000));
        return date;
    }

    public static long stringToEpoch(String date) throws ParseException{
        long epoch = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse(date).getTime() / 1000;
        return epoch;
    }

}
