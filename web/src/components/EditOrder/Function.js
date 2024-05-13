import axios from "axios";

export const fetchSuggestions = async (value) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};
// const getCoordinates = async () => {
//   console.log(adressA);
//   const response = await fetch(
//     `https://geocode-maps.yandex.ru/1.x/?apikey=f3c78576-996b-4eaa-84f8-12a8520d276a&format=json&geocode=${adressA.value}`
//   );
//   const data = await response.json();
//   console.log("response", response);
//   if (data.response.GeoObjectCollection.featureMember.length > 0) {
//     const geoObject =
//       data.response.GeoObjectCollection.featureMember[0].GeoObject;
//     const coords = geoObject.Point.pos.split(" ");
//     const [longitude, latitude] = coords;
//     console.log({ latitude, longitude });
//     setCoordinates({ latitude, longitude });
//   } else {
//     setCoordinates(null);
//   }
// };
