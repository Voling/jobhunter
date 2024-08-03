import http.client
import json
from urllib.parse import urlencode
from . import keys

def get_real_distance(origin, destination):
    host = "maps.googleapis.com"
    base_url = "/maps/api/directions/json"

    params = urlencode({ 'origin': origin, 'destination': destination,'key': keys.google_key})

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