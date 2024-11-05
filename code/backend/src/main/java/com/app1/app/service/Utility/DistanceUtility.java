package com.app1.app.service.Utility;

public class DistanceUtility {
    private static final double EARTH_RADIUS = 6250.01;

    public static double calculateDistance(Double[] coordinates1, Double[] coordinates2){
        double lat1Rad = Math.toRadians(coordinates1[0]);
        double lon1Rad = Math.toRadians(coordinates1[1]);
        double lat2Rad = Math.toRadians(coordinates2[0]);
        double lon2Rad = Math.toRadians(coordinates2[1]);

        double dlat = lat2Rad - lat1Rad;
        double dlon = lon2Rad - lon1Rad;

        double a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.pow(Math.sin(dlon / 2), 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    public static void main(String[] args){
        Double[] coordinates1 = {1.3463164097941078, 103.6840730077318};
        Double[] coordinates2 = {1.3301543085935643, 104.00607517769996};
        Double dist = calculateDistance(coordinates1, coordinates2);
        System.out.println(dist);
    }
}
