let latitudeEl = document.getElementById("lat")
let longitudeEl = document.getElementById("lng")


function initMap() {

    const map = new google.maps.Map(document.getElementById("map"),
     {
        mapId: "7e3e5ea353ef0c7e",
        zoom: 12,
        center: { lat: Number(latitudeEl.value), lng: Number(longitudeEl.value) },
    });
    const markers = [
        [
            "EcoSpot location",
            Number(latitudeEl.value),
            Number(longitudeEl.value),
            "Ecospot.svg",
            70,
            40
        ]
    ];
    for(let i=0; i<markers.length;i++){
        const currMarker = markers[i];
        const marker = new google.maps.Marker({
            position: { lat: currMarker[1], lng: currMarker[2] },
            map,
            title: currMarker[0],
            icon: {
                url:currMarker[3],
                scaledSize: new google.maps.Size(currMarker[4],currMarker[5])
            }
        });
        const infowindow = new google.maps.InfoWindow({
            content: currMarker[0]
        });
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    };
};
window.initMap = initMap;  

