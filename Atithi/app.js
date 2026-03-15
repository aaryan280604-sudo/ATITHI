// Initialize map
var map = L.map('map').setView([26.9124, 75.7873], 12);

// OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap contributors'
}).addTo(map);

// Marker cluster group
var markers = L.markerClusterGroup();

// Load food_data.json
fetch("food_data.json")
.then(response => response.json())
.then(data => {

    var city = data["Jaipur"];

    // FOOD VENDORS
    city.street_food_vendors.forEach(vendor => {

        var coords = vendor.google_map_coordinates.split(",");

        var marker = L.marker([parseFloat(coords[0]), parseFloat(coords[1])]);

        marker.bindPopup(
            "<b>"+vendor.vendor_name+"</b><br>"+
            "Food: "+vendor.famous_food+"<br>"+
            "Price: "+vendor.average_price_range+"<br>"+
            "Taste Rating: "+vendor.taste_rating
        );

        markers.addLayer(marker);

    });


    // HOTELS
    city.budget_hotels.forEach(hotel => {

        var coords = hotel.google_map_coordinates.split(",");

        var marker = L.marker([parseFloat(coords[0]), parseFloat(coords[1])]);

        marker.bindPopup(
            "<b>"+hotel.hotel_name+"</b><br>"+
            "Price per night: ₹"+hotel.price_per_night+"<br>"+
            "Rating: "+hotel.rating
        );

        markers.addLayer(marker);

    });


    // TOURIST SPOTS
    city.tourist_spots.forEach(spot => {

        var coords = spot.google_map_coordinates.split(",");

        var marker = L.marker([parseFloat(coords[0]), parseFloat(coords[1])]);

        marker.bindPopup(
            "<b>"+spot.place_name+"</b><br>"+
            "Entry Fee: "+spot.entry_fee+"<br>"+
            "Best time: "+spot.best_time_to_visit
        );

        markers.addLayer(marker);

    });

    map.addLayer(markers);

});