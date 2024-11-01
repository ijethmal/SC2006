package com.app1.app.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.ArrayList;
import java.util.Comparator;

public class SearchUtility {
    
    private static Map<String, Integer> getTermFrequencyMap(String str) {
        Map<String, Integer> frequencyMap = new HashMap<>();
        String[] words = str.toLowerCase().split("[^a-zA-Z]+");

        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        return frequencyMap;
    }

    public static double cosineSimilarity(String str1, String str2) {
        Map<String, Integer> freqMap1 = getTermFrequencyMap(str1);
        Map<String, Integer> freqMap2 = getTermFrequencyMap(str2);

        Set<String> allWords = new HashSet<>(freqMap1.keySet());
        allWords.addAll(freqMap2.keySet());

        double dotProduct = 0.0;
        double magnitude1 = 0.0;
        double magnitude2 = 0.0;

        for (String word : allWords) {
            int freq1 = freqMap1.getOrDefault(word, 0);
            int freq2 = freqMap2.getOrDefault(word, 0);

            dotProduct += freq1 * freq2;
            magnitude1 += Math.pow(freq1, 2);
            magnitude2 += Math.pow(freq2, 2);
        }

        if (magnitude1 == 0 || magnitude2 == 0) {
            return 0.0; 
        } else {
            return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
        }
    }

    public static ArrayList<String> searchSimilarityCosine(ArrayList<String> strings, String inputString){
        ArrayList<String> output = new ArrayList<>();
        for (String str : strings){
            double simi = cosineSimilarity(str, inputString);
            if (simi > 0.0) output.add(str);
        }
        output.sort(Comparator.comparingDouble(str -> (-1) * cosineSimilarity(str, inputString)));
        return output;
    }
/*
    public static ArrayList<String> searchSimilarityLeven(ArrayList<String> strings, String inputString) {
        LevenshteinDistance levenshtein = new LevenshteinDistance();
        ArrayList<String> similarStrings = new ArrayList<>();
        
        for (String str : strings) {
            int distance = levenshtein.apply(inputString, str);
            if (distance <= 20) {
                similarStrings.add(str);
            }
        }
        similarStrings.sort(Comparator.comparingInt(str -> levenshtein.apply(inputString, str)));
        
        return similarStrings;
    }
*/
    public static void main(String[] args) {
        ArrayList<String> facilities = new ArrayList<>(List.of("Clementi Stadium", "Clementi Sports Centre", "Jurong West Sports Centre", "Kallang Basin Swimming Complex", "Kallang Sports Centre", "Katong Swimming Complex", "AMK Swimming Complex", "Bishan Sports Centre", "Bukit Batok Swimming Complex", "Farrer Park Field and Tennis Centre", "Jalan Besar Sports Centre", "Jurong East Sports Centre", "Heartbeat@Bedok", "Hougang Sports Centre", "Bukit Gombak Sports Centre", "Bedok Stadium", "Burghley Squash and Tennis Centre", "Choa Chu Kang Sports Centre", "Jurong Stadium", "Our Tampines Hub - Community Auditorium", "Pasir Ris Sports Centre", "Queenstown Sports Centre", "Sengkang Sports Centre", "Serangoon Sports Centre", "Toa Payoh Sports Centre", "Woodlands Sports Centre", "St Wilfrid Sports Centre", "Yio Chu Kang Sports Centre", "Yishun Sports Centre", "Yishun Swimming Complex", "Co Curricular Activities Branch", "Delta Sports Centre", "Enabling Village Gym", "Geylang East Swimming Complex", "Geylang Field"));
        String inputString = "Clementi";
        ArrayList<String> searchResult = searchSimilarityCosine(facilities, inputString);
        System.out.println(searchResult);
    }
}
