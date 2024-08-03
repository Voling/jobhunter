import http.client
import json
from . import keys

def get_zip(lat, lng):
    host = "maps.googleapis.com"
    base_url = "/maps/api/geocode/json"

    params = f"latlng={lat},{lng}&key={keys.google_key}"

    connection = http.client.HTTPSConnection(host)
    connection.request("GET", f"{base_url}?{params}")

    response = connection.getresponse()

    if response.status == 200:
        result = json.loads(response.read().decode("utf-8"))

        address_components = result.get('results', [])[0].get('address_components', [])

        for component in address_components:
            if 'postal_code' in component['types']:
                return component['long_name']

    return None

def get_address(lat, lng):
    host = "maps.googleapis.com"
    base_url = "/maps/api/geocode/json"

    params = f"latlng={lat},{lng}&key={google_key}"

    connection = http.client.HTTPSConnection(host)
    connection.request("GET", f"{base_url}?{params}")

    response = connection.getresponse()

    if response.status == 200:
        result = json.loads(response.read().decode("utf-8"))
        formatted_address = result.get('results', [])[0].get('formatted_address', None)
        connection.close()
        return formatted_address

    connection.close()
    return None
