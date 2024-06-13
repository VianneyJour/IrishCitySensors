import os
import requests

file = open('./position.txt', 'a')

x = requests.get('https://api.nationaltransport.ie/gtfsr/v2/Vehicles?format=json', params={'format': 'json'},
                 headers={'Host': 'api.nationaltransport.ie', 'X-Api-Key': 'b29d78f8ff1d4bb7a871d810ab0a9f29',
                          'X-Ms-Api-Devportal': 'gtfsr'})
print(x.status_code)

file.write(x.text)
file.close()