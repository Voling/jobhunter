// api.js
import axios from 'axios';


const axiosInstance = axios.create({ baseURL: 'http://localhost:8000' });
const test = `[
  {
    "Title": "Subsurface Utility Engineering (SUE) Field Technician l",
    "Location": "Huntington Beach, CA",
    "Company": "T2 Utility Engineers",
    "Address": "5622 Research Dr suite a, Huntington Beach, CA 92649, USA",
    "Lat": 33.7338056,
    "Lng": -118.0305676,
    "Geo_distance": 0.874342945871305,
    "Real_distance": "1.3 mi",
    "dummy": 1.3
  }]`
export async function fetchListings({ keyword, radius, positionX, positionY }) {
  console.log("Sending listings query...");
  try {
    const response = await axiosInstance.get('/api/listings', {
      params: {
        keyword,
        radius,
        positionX,
        positionY
      }
    });
    // Assuming the response data is the format you need
    return response.data;
  } catch (error) {
    console.error("Failed to retrieve listings, returning test data", error);
    return JSON.parse(test);
  }
}



// export async function fetchCoordinates({ keyword, radius, address }) {
//   console.log("Sending coordinates query...");
//   try {
//     const response = await axiosInstance.get('/api/coord', {
//       params: {
//         keyword,
//         radius,
//         address
//       }
//     });
//     // Assuming the response data is the format you need
//     return response.data;
//   } catch (error) {
//     console.error("Failed to retrieve coordinates, returning test data", error);
//     return JSON.parse(test);
//   }
// }