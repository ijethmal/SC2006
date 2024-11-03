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

    public Page<Event> getEvents (int page, int size){
        return eventRepo.findAll(PageRequest.of(page, size, Sort.by("time")));
    }

    public List<Event> getEventFromAPI(String id) {
        HttpHost targetHost = new HttpHost("api.eventfinda.co.nz", 80, "http");
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
            new AuthScope(targetHost.getHostName(), targetHost.getPort()),
            new UsernamePasswordCredentials("gather", "mmmb9mgbdymv")
        );
        

        CloseableHttpClient httpclient = HttpClients.custom()
            .setDefaultCredentialsProvider(credsProvider)
            .build();

        List<Event> eventsList = new ArrayList<>();
        int page = 1;
        int rows = 2; // Number of events per page
        boolean hasMoreEvents = true;

        try {
            //while (hasMoreEvents) {
                AuthCache authCache = new BasicAuthCache();
                BasicScheme basicAuth = new BasicScheme();
                authCache.put(targetHost, basicAuth);

                HttpClientContext localcontext = HttpClientContext.create();
                localcontext.setAuthCache(authCache);

                HttpGet httpget = new HttpGet("/v2/events.xml?rows=" + rows + "&page=" + page);
                httpget.addHeader("Accept", "application/xml");
                httpget.addHeader("Authorization", "Basic " + java.util.Base64.getEncoder().encodeToString(("gather:mmmb9mgbdymv").getBytes()));
                logger.info("Executing request " + httpget.getRequestLine());

                HttpResponse response = httpclient.execute(targetHost, httpget, localcontext);
                HttpEntity entity = response.getEntity();

                StringBuilder xmlString = new StringBuilder();
                BufferedReader rd = new BufferedReader(new InputStreamReader(entity.getContent()));

                String line;
                while ((line = rd.readLine()) != null) {
                    xmlString.append(line);
                }

                //logger.info("API Response for page " + page + ": " + xmlString.toString());

                // Load into events db
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                org.w3c.dom.Document doc = builder.parse(new ByteArrayInputStream(xmlString.toString().getBytes("UTF-8")));
                NodeList events = doc.getElementsByTagName("event");
                if (events.getLength() == 0) {
                    hasMoreEvents = false;
                } else {
                        logger.info("Events found: " + events.getLength());
                        for (int i = 0; i < events.getLength(); i++) {
                            org.w3c.dom.Node event = events.item(i);
                            //event.getTextContent();
                            //get tags
                            NodeList tags = event.getChildNodes();
                            /*for (int j = 0; j < tags.getLength(); j++) {
                                org.w3c.dom.Node tag = tags.item(j);
                                if (tag.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                                    org.w3c.dom.Element tagElement = (org.w3c.dom.Element) tag;
                                    logger.info("Tag Name: " + tagElement.getTagName());
                                }
                            }*/
                            //create a dictionary of event details
                            HashMap<String, String> eventDetails = new HashMap<>();
                            for (int j = 0; j < tags.getLength(); j++) {
                                org.w3c.dom.Node tag = tags.item(j);
                                if (tag.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                                    org.w3c.dom.Element tagElement = (org.w3c.dom.Element) tag;
                                    eventDetails.put(tagElement.getTagName(), tagElement.getTextContent());
                                }
                            }
                            //logger.info("Event Details: " + eventDetails);
                            //create an event object
                            Event newEvent = new Event();
                            newEvent.setName(eventDetails.get("name"));
                            //newEvent.setTime(Long.parseLong(eventDetails.get("datetime_start")));
                            newEvent.setDetails(eventDetails.get("description"));
                            newEvent.setFacility(eventDetails.get("venue_name"));
                            newEvent.setUrl(eventDetails.get("url"));
                            //save event to db
                            eventRepo.save(newEvent);
                            logger.info("Event saved: " + newEvent.getName());
                            eventsList.add(newEvent);
                        }
                    page++;
                }
            //}
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
