from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt


import json
import sys
from pathlib import Path
import logging


current_script_directory = Path(__file__).resolve().parent
parent_directory = current_script_directory.parent
sys.path.append(str(parent_directory))
from jobhunterapi.api.coor_to_zip import get_address, get_zip
from jobhunterapi.api.distance import get_real_distance
from jobhunterapi.api.geo_distance import get_geo_distance
from jobhunterapi.api.data import geocode, get_company_address, get_surrounding_zip_codes, only_geocode, search
from jobhunterapi.api.logo import get_logo

# Create your views here.

@csrf_exempt
def coor_to_zip_view(request):
    try:
        data = json.loads(request.body)
        lat = data.get('latitude')
        lon = data.get('longitude')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status = 400)
    
    if lat and lon:
        zip_code = get_zip(lat, lon)
        address = get_address(lat, lon)

        return JsonResponse({'zip code': zip_code, 'address': address})

@csrf_exempt
def real_distance_view(request):
    try:
        data = json.loads(request.body)
        origin = data.get('origin')
        destination = data.get('destination')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    if origin and destination:
        distance_result = get_real_distance(origin, destination)
        if distance_result:
            return JsonResponse({'real_distance': distance_result})
        else:
            return JsonResponse({'error': 'Could not calculate real distance'}, status=500)
    else:
        return JsonResponse({'error': 'Both origin and destination are required'}, status=400)

@csrf_exempt
def get_geo_distance_view(request):
    try:
        data = json.loads(request.body)
        lat1 = data.get('lat1')
        lon1 = data.get('lon1')
        lat2 = data.get('lat2')
        lon2 = data.get('lon2')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    if lat1 and lon1 and lat2 and lon2:
        distance = haversine(float(lat1), float(lon1), float(lat2), float(lon2))
        return JsonResponse({'distance': distance})
    else:
        return JsonResponse({'error': 'All coordinates (lat1, lon1, lat2, lon2) are required'}, status=400)

@csrf_exempt
def geocode_view(request):
    address = request.GET.get('address')  # Use request.GET instead of request.query_params
    if not address:
        return JsonResponse({"error": "Address parameter is required."}, status=400)

    # Call the function from data.py
    result = geocode(address)

    # Check the result and return the response
    if isinstance(result, tuple) and result[0] != 200:
        return JsonResponse({"error": result[1]}, status=result[0])
    else:
        return JsonResponse(result)
    

import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def only_geocode_view(request):
    try:
        address = request.GET.get('address')
        if not address:
            return JsonResponse({"error": "Address parameter is required."}, status=400)

        # Call your only_geocode function from data.py
        result = only_geocode(address)

        # Check the result and return the response
        if isinstance(result, tuple):
            status_code = result[0] if isinstance(result[0], int) and 100 <= result[0] <= 599 else 500
            return JsonResponse({"error": result[1]}, status=status_code)
        else:
            lat, lng = result
            return JsonResponse({"latitude": lat, "longitude": lng})
    except Exception as e:
        logger.error(f"Error in only_geocode_view: {e}", exc_info=True)  # Log the error details
        return JsonResponse({"error": "Internal Server Error"}, status=500)

@csrf_exempt
def get_company_address_view(request):
    company_name = request.GET.get('company_name')
    city = request.GET.get('city')
    if not company_name or not city:
        return JsonResponse({"error": "Both company_name and city parameters are required."}, status=400)

    address = get_company_address(company_name, city)

    if address:
        return JsonResponse({"address": address})
    else:
        return JsonResponse({"error": "Address not found."}, status=404)

@csrf_exempt
def get_surrounding_zip_codes_view(request):
    base_zip = request.GET.get('base_zip')
    radius = request.GET.get('radius', 5)  # Default to 5 if not provided

    if not base_zip:
        return JsonResponse({"error": "base_zip parameter is required."}, status=400)
    
    try:
        radius = int(radius)  # Ensure radius is an integer
    except ValueError:
        return JsonResponse({"error": "radius must be an integer."}, status=400)

    zip_codes = get_surrounding_zip_codes(base_zip, radius)

    return JsonResponse({"surrounding_zip_codes": zip_codes})

@csrf_exempt
def get_logo_view(request):
    name = request.GET.get('name')
    if not name:
        return JsonResponse({"error": "Name parameter is required."}, status=400)
    
    logo_path = get_logo(name)
    
    if logo_path:
        # Return the logo as a file response
        try:
            return FileResponse(open(logo_path, 'rb'), as_attachment=True, filename=f"{name}_logo.png")
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Logo not found or error retrieving the logo."}, status=404)

logger = logging.getLogger(__name__)
@csrf_exempt
def search_view(request):
    keyw = request.GET.get('keyword')
    loca = request.GET.get('location')
    rad = request.GET.get('radius', '5')  # Default to '5' if not provided
    lat_input = request.GET.get('lat_input')
    lng_input = request.GET.get('lng_input')

    # Validate required parameters
    try:
        if not all([keyw, loca, lat_input, lng_input]):
            return JsonResponse({"error": "keyw, loca, lat_input, and lng_input parameters are required."}, status=400)
        try:
            rad = int(rad) #force radius to int
        except ValueError:
            logger.error(f"Error in search_view: {e}", exc_info=True)
            return JsonResponse({"error": "rad must be an integer."}, status=400)

        file_path = search(keyw, loca, rad, lat_input, lng_input) #call search

        #serve file
        if file_path:
            
            try:
                
                return FileResponse(open(file_path, 'rb'), as_attachment=True, filename="output.json")
            except Exception as e:
                logger.error(f"Error in search_view: {e}", exc_info=True)
                return JsonResponse({"error": str(e)}, status=500)
        else:
            return JsonResponse({"error": "Failed to perform search or generate file."}, status=500)
    except Exception as e:
        logger.error(f"Error in search_view: {e}", exc_info=True)
        return JsonResponse({"error": str(e)}, status=500)