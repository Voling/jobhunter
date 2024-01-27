import http.client

host = 'jooble.org'
key = 'ba0e5c67-fec5-49b3-9f46-5d50a445097b'

connection = http.client.HTTPConnection(host)
#request headers
headers = {"Content-type": "application/json"}
#json query
body = '{ "keywords": "software engineer", "location": "los angeles"}'
connection.request('POST','/api/' + key, body, headers)
response = connection.getresponse()
print(response.status, response.reason)
print(response.read())
