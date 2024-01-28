import http.client

def get_logo(name):
    domain = f'{name}.com'
    url = f"/{domain}"

    connection = http.client.HTTPSConnection("logo.clearbit.com")
    connection.request("GET", url)
    response = connection.getresponse()

    if response.status == 200:
        with open('company_logo.png', 'wb') as file:
            file.write(response.read())
        print('Logo downloaded successfully.')
    else:
        print(f'Failed to fetch logo. Status code: {response.status}')