// 📍 MAPA
const center = [25.58512, -103.495814];
const zoom = 18;

// 🔑 SUPABASE (YA CON TU KEY)
const supabaseClient = supabase.createClient(
  "https://hhzsabpxfdrngaunpnrq.supabase.co",
  "sb_publishable_oAGP-vfeaVVTVvrYjqO96A_lOhQGuPm"
);

// ELEMENTOS
const popup = document.querySelector(".popup");

const inputLatitude = document.querySelector(".latitude");
const inputLongitude = document.querySelector(".longitude");
const inputLocation = document.querySelector(".location");

const buttonCancel = document.querySelector(".Cancel");
const buttonSave = document.querySelector(".Save");

// CANCELAR
buttonCancel.addEventListener("click", () => {
  popup.close();
});

// GUARDAR
buttonSave.addEventListener("click", async () => {
  const lat = inputLatitude.value;
  const lng = inputLongitude.value;
  const loc = inputLocation.value;

  console.log("Guardando...");

  const { data, error } = await supabaseClient.from("Cordinates").insert([
    {
      latitude: lat,
      longitude: lng,
      location_name: loc,
    },
  ]);

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert("Error ❌");
  } else {
    alert("Guardado ✅");
    if (clickMarker) {
      clickMarker
        .bindPopup(
          `📍 ${loc}<br>Lat: ${parseFloat(lat).toFixed(6)}<br>Lng: ${parseFloat(
            lng
          ).toFixed(6)}`
        )
        .openPopup();
    }
  }
  popup.close();
});

// CREAR MAPA
const map = L.map("map").setView(center, zoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// MARCADOR
let clickMarker = null;

map.on("click", (e) => {
  const { lat, lng } = e.latlng;

  inputLatitude.value = lat;
  inputLongitude.value = lng;

  popup.showModal();

  clickMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`)
    .openPopup();
});
