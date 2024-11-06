package com.app1.app;

import java.text.ParseException;
import com.app1.app.service.EventService;

// To test my non-db functions LOL 
// Feel free to use

public class Test {
    public static void main(String[] args) throws ParseException{
        System.out.println(EventService.stringToEpoch("02/08/2024 14:02:01"));
        System.out.println(EventService.epochToString(1698787200));
    }
}
