import os
import requests

file = open('./position.txt', 'a')

x = requests.get('https://api.nationaltransport.ie/gtfsr/v2/Vehicles?format=json', params={'format': 'json'},
                 headers={'Host': 'api.nationaltransport.ie', 'X-Api-Key': 'e376f9630ddf40bca85ea27bac5ac334',
                          'X-Ms-Api-Devportal': 'gtfsr'})
print(x.status_code)

file.write(x.text)
file.close()