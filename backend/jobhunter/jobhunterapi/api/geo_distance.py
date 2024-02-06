from math import radians, sin, cos, sqrt, atan2

def get_geo_distance(lat1, lon1, lat2, lon2):
    # Ensure input types are float
    try:
        lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
    except ValueError:
        raise ValueError("All coordinates must be real numbers.")
    
    R = 6371.0  # Radius of the Earth in km
    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    # Convert the distance from km to miles
    return R * c * 0.621371
