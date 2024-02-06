import http.client
import os

def get_logo(name):
    domain = f'{name}.com'
    url = f"/{domain}"

    script_dir = os.path.dirname(__file__)
    folder_name = 'company_logos'
    folder_path = os.path.join(script_dir, folder_name)

    os.makedirs(folder_path, exist_ok=True)
    connection = http.client.HTTPSConnection("logo.clearbit.com")
    connection.request("GET", url)
    response = connection.getresponse()

    if response.status == 200:
        logo_path = os.path.join(folder_path, f'{name}_logo.png')
        print(logo_path)
        with open(logo_path, 'wb') as file:
            file.write(response.read())
        return logo_path
    else:
        return