package com.app1.app.service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.http.HttpHeaders;
import java.text.ParseException;

import com.app1.app.domain.InterestGroup;
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

//http imports
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import java.util.logging.Logger;
//import org.apache.http.protocol.BasicHttpContext;
//import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackOn = Exception.class)

public class EventService {

    @Autowired
    public final EventRepo eventRepo;
    public final UserService userService;
    public final InterestGroupService interestGroupService;
    //private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger logger = Logger.getLogger(EventService.class.getName());

    public List<Event> getAllEventsFromAPI() {
        HttpHost targetHost = new HttpHost("api.stb.gov.sg", 443, "https");
        CloseableHttpClient httpclient = HttpClients.createDefault();

        List<Event> eventsList = new ArrayList<>();

        try {
            String url = "/content/events/v2/search?searchType=keyword&searchValues=" + "singapore";
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
            JSONObject jsonResponse = new JSONObject(jsonString.toString());
            JSONArray eventsArray = jsonResponse.getJSONArray("data");

            for (int i = 0; i < eventsArray.length(); i++) {
                JSONObject eventObject = eventsArray.getJSONObject(i);
                String name = truncate(eventObject.getString("name"), 255);
                String description = truncate(eventObject.getString("description"), 255);
                String startDate = eventObject.getString("startDate");
                String endDate = eventObject.getString("endDate");
                String venue = truncate(eventObject.getJSONObject("address").getString("buildingName"), 255);
                JSONObject location = eventObject.getJSONObject("location");
                Double latitude = location.getDouble("latitude");
                Double longitude = location.getDouble("longitude");
                String eventUrl = eventObject.getString("officialWebsite");
                
                logger.info("Event Name: " + name);
                logger.info("Event Description: " + description);
                logger.info("Event Start Date: " + startDate);
                logger.info("Event End Date: " + endDate);
                logger.info("Event Latitude: " + latitude);
                logger.info("Event Longitude: " + longitude);
                logger.info("Event Venue: " + venue);
                
                Event newEvent = new Event();
                newEvent.setTitle(name);
                newEvent.setDetails(description);
                newEvent.setTime(stringToEpoch(startDate));
                //newEvent.setEndTime(stringToEpoch(endDate));
                newEvent.setLocation(venue);
                Double[] coordinates = {latitude, longitude};
                newEvent.setCoordinates(coordinates);
                newEvent.setIsActiveSg(false);
                newEvent.setEventUrl(eventUrl);
                eventRepo.save(newEvent);
                eventsList.add(newEvent);
                logger.info("Saved event: " + newEvent.getTitle() + ", " + newEvent.getTime() + ", " + newEvent.getFacility() + ", " + newEvent.getCoordinates());
            }

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

    private String truncate(String value, int length) {
        if (value.length() > length) {
            return value.substring(0, length);
        }
        return value;
    }

    public static long stringToEpoch(String dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
        ZonedDateTime zonedDateTime = ZonedDateTime.parse(dateTime, formatter);
        return zonedDateTime.toEpochSecond();
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
        if (event.getAttendees() != null) oEvent.setAttendees(event.getAttendees());
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
            userService.addEvent(userId, eventId);
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
            userService.removeEvent(userId, eventId);
            eventRepo.save(event);
        } else throw new Exception("User not found");
    }

    public static String epochToString(long epoch){
        String date = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date (epoch*1000));
        return date;
    }

    public ArrayList<Event> getEventsOfUser(String userId, int size){
        User user = userService.getUser(userId);
        ArrayList<Event> output_events = new ArrayList<>();
        HashMap<String, Integer> events = user.getEvents();
        int cnt = 0;
        for (String key : events.keySet()){
            Event event = getEvent(key);
            output_events.add(event);
            cnt ++;
            if (cnt == size) break;
        }
        return output_events;
    }

    public ArrayList<Event> getEventsOfGroup(String groupId, int size){
        InterestGroup group = interestGroupService.getInterestGroup(groupId);
        ArrayList<Event> output_events = new ArrayList<>();
        HashMap<String, Integer> events = group.getEvents();
        int cnt = 0;
        for (String key : events.keySet()){
            Event event = getEvent(key);
            output_events.add(event);
            cnt ++;
            if (cnt == size) break;
        }
        return output_events;
    }

}
