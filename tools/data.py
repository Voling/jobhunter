import http.client
import json
from urllib.parse import urlencode
import coor_to_zip
import geo_distance
import distance
import logo
from uszipcode import SearchEngine

#find coordinates given address
def geocode(address):
    host = "maps.googleapis.com"
    base_url = "/maps/api/geocode/json"
    api_key = 'AIzaSyBCZo8kaQLiNBtcXHuWyLFyCgcWHbgZ4mo'
    params = urlencode({'address': address, 'key': api_key})
    connection = http.client.HTTPSConnection(host)
    connection.request("GET", f"{base_url}?{params}")
    response = connection.getresponse()
    data = json.loads(response.read().decode("utf-8"))
    if response.status == 200:
        return data
    else:
        return response.status, response.reason



#find exact address of a company given city,state
def get_company_address(company_name, city):
    host = "maps.googleapis.com"
    base_url = "/maps/api/geocode/json"
    api_key = 'AIzaSyBCZo8kaQLiNBtcXHuWyLFyCgcWHbgZ4mo'
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
    

def get_surrounding_zip_codes(base_zip, radius=5):
    search = SearchEngine()

    base_info = search.by_zipcode(base_zip)
    base_latitude, base_longitude = base_info.lat, base_info.lng

    nearby_zip_codes = search.by_coordinates(base_latitude, base_longitude, radius=radius)

    return [zipcode.zipcode for zipcode in nearby_zip_codes]


def secondary_search(keyw, loca, rad, lat_input, lng_input):
    host = 'jooble.org'
    key = 'ba0e5c67-fec5-49b3-9f46-5d50a445097b'

    connection = http.client.HTTPConnection(host)
    #request headers
    headers = {"Content-type": "application/json"}
    #json query
    body = f'{{ "keywords": "{keyw}", "location": "{loca}", "radius": "{rad}"}}'
    connection.request('POST','/api/' + key, body, headers)
    response = connection.getresponse()
    #print(response.status, response.reason)

    s = (str(response.read().decode('utf-8'))[2:].split("},"))
    for i in range(len(s)):
        s[i] += "}"
        s[i] = rf'{s[i]}'
    s[0] = s[0][s[0].find("[")+1:]
    s[-1] = s[-1][:-3]
    return s



def search(keyw, loca, rad, lat_input, lng_input):
    host = 'jooble.org'
    key = 'ba0e5c67-fec5-49b3-9f46-5d50a445097b'

    connection = http.client.HTTPConnection(host)
    #request headers
    headers = {"Content-type": "application/json"}
    #json query
    body = f'{{ "keywords": "{keyw}", "location": "{loca}", "radius": "{rad}"}}'
    connection.request('POST','/api/' + key, body, headers)
    response = connection.getresponse()
    #print(response.status, response.reason)

    s = (str(response.read().decode('utf-8'))[2:].split("},"))
    for i in range(len(s)):
        s[i] += "}"
        s[i] = rf'{s[i]}'
    s[0] = s[0][s[0].find("[")+1:]
    s[-1] = s[-1][:-3]
    if len(s) < 2:
        zipes = get_surrounding_zip_codes(loca)
        for i in zipes:
            ss = secondary_search(keyw, i, rad, lat_input, lng_input)
            if len(ss) > 0:
                s = ss
                break
    lst = []
    for i in range(len(s)):
        dct = {"Title": "", "Location": "", "Company": "", "Address": "",  
               "Lat": "", "Lng" : "", "Geo_distance" : "", "Real_distance": "", "dummy": 10000}
        #print("Title: ", json.loads(s[i])["title"] + ", " + "Location: " + json.loads(s[i])["location"], end = ", ")
        json_obj = json.loads(s[i])
        dct["Title"] = json_obj["title"]
        dct["Location"] = json_obj["location"]

        #print("Company: " + json.loads(s[i])["company"])
        dct["Company"] = json_obj["company"]
        address = str(get_company_address("".join(json_obj["company"].split()), 
                                                    "".join(str(json_obj["location"]).split(", ")[0].split())))
        #print("The address is: ", address)
        dct["Address"] = address

        if len(address.split(',')) == 4:
            #print("Coordinates are: ", geocode(address)['results'][0]['geometry']['location'])
            dct["Lat"], dct["Lng"] = geocode(address)['results'][0]['geometry']['location']["lat"], geocode(address)['results'][0]['geometry']['location']["lng"]
            dct["Geo_distance"] = geo_distance.get_geo_distance(lat_input, lng_input, dct["Lat"], dct["Lng"])
            dct["Real_distance"] = distance.get_real_distance(coor_to_zip.get_address(lat_input, lng_input),
                                                              coor_to_zip.get_address(dct["Lat"], dct["Lng"]))
            dct["dummy"] = float(dct["Real_distance"][:-3])
            #l = dct["Address"].split(", ")
        lst.append(dct)
    return sorted(lst, key=lambda x: x["dummy"])


data = search("software engineer", coor_to_zip.get_zip(33.736696, -118.015753), 10, 33.736696, -118.015753)
'''
for d in data:
    print(d)
    print(" ")
    print(" ")
'''
file_path = "output.json"
with open(file_path, 'w') as json_file:
    json.dump(data, json_file, indent=2) 