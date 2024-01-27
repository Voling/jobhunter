import http.client
import json
from urllib.parse import urlencode
import coor_to_zip

def geocode(address, api_key):
    host = "maps.googleapis.com"
    base_url = "/maps/api/geocode/json"
    params = urlencode({'address': address, 'key': api_key})
    connection = http.client.HTTPSConnection(host)
    connection.request("GET", f"{base_url}?{params}")
    response = connection.getresponse()
    data = json.loads(response.read().decode("utf-8"))
    if response.status == 200:
        return data
    else:
        return response.status, response.reason


def get_company_address(api_key, company_name, city):
    host = "maps.googleapis.com"
    base_url = "/maps/api/geocode/json"
    
    params = f"?address={company_name},{city}&key={api_key}"

    connection = http.client.HTTPSConnection(host)

    connection.request("GET", base_url + params)

    response = connection.getresponse()
    data = json.loads(response.read().decode("utf-8"))

    if response.status == 200 and data["status"] == "OK":
        address = data["results"][0]["formatted_address"]
        connection.close()
        return address
    else:
        connection.close()
        return None


host = 'jooble.org'
key = 'ba0e5c67-fec5-49b3-9f46-5d50a445097b'
google_api_key = 'AIzaSyBCZo8kaQLiNBtcXHuWyLFyCgcWHbgZ4mo'

connection = http.client.HTTPConnection(host)
#request headers
headers = {"Content-type": "application/json"}
#json query
body = '{ "keywords": "software engineer", "location": "90210", "radius": "2"}'
connection.request('POST','/api/' + key, body, headers)
response = connection.getresponse()
print(response.status, response.reason)

s = (str(response.read().decode('utf-8'))[2:].split("},"))
for i in range(len(s)):
    s[i] += "}"
    s[i] = rf'{s[i]}'
s[0] = s[0][s[0].find("[")+1:]
s[-1] = s[-1][:-3]
for i in range(len(s)):
    print("Title: ", json.loads(s[i])["title"] + ", " + "Location: " + json.loads(s[i])["location"], end = ", ")
    try:
        print("Company: " + json.loads(s[i])["company"])
        address = str(get_company_address(google_api_key, "".join(json.loads(s[i])["company"].split()), 
                                                      "".join(str(json.loads(s[i])["location"]).split(", ")[0].split())))
        print("The address is: ", address)
        if len(address.split(',')) == 4:
            print("Coordinates are: ", geocode(address, google_api_key)['results'][0]['geometry']['location'])
    except Exception as e:
        print(e)
    print(" ")
    #print(json.loads(s[i]))
    print(" ")

