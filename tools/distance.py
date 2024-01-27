import http.client
import json
from urllib.parse import urlencode

def get_directions(api_key, origin, destination):
    host = "maps.googleapis.com"
    base_url = "/maps/api/directions/json"

    params = urlencode({ 'origin': origin, 'destination': destination,'key': api_key})

    connection = http.client.HTTPSConnection(host)

    connection.request("GET", f"{base_url}?{params}")

    response = connection.getresponse()
    data = json.loads(response.read().decode("utf-8"))

    if response.status == 200:
        total_distance = data['routes'][0]['legs'][0]['distance']['text']
        connection.close()
        return total_distance
    else:
        connection.close()
        return None

api_key = 'AIzaSyBCZo8kaQLiNBtcXHuWyLFyCgcWHbgZ4mo'

origin = 'Corelogic Ivrine'
destination = 'University town center irvine'

distance = get_directions(api_key, origin, destination)

if distance:
    print(f"The total distance between {origin} and {destination} is: {distance}")
else:
    print("Failed to fetch directions.")