import datetime
import os
import csv
import mysql.connector
import hashlib

def sha256sum(filename):
    h  = hashlib.sha256()
    b  = bytearray(128*1024)
    mv = memoryview(b)
    with open(filename, 'rb', buffering=0) as f:
        while n := f.readinto(mv):
            h.update(mv[:n])
    return h.hexdigest()

ancien = sha256sum('./busPosition.csv')

file = open('./position.txt', 'r')
data = file.read()

# mydb = mysql.connector.connect(
#     host="localhost",
#     user="vijourdy1",
#     password="5CxZB69V2",
#     database="busDataBase"
# )
# mycursor = mydb.cursor()

# mycursor.execute("CREATE DATABASE busDataBase")
# mycursor.execute("CREATE TABLE busPosition(id VARCHAR(255), longitude NUMERIC(12,9), latitude NUMERIC(12,9), date DATETIME)")

bus = {}
vehicle = 0

id = ""
latitude = 0.0
longitude = 0.0

for line in data.split("\n"):
    if "latitude" in line :
        latitude = line.split(' ')[6]
        latitude = latitude.split(',')[0]
    elif "longitude" in line :
        longitude = line.split(' ')[6]
    elif "vehicle" in line:
        vehicle += 1
    elif vehicle == 2 and "id" in line:
        id = line.split('"')[3]
        bus[id] = (longitude, latitude)
        vehicle = 0

file.close()

header = ['id', 'Latitude', 'Longitude', 'Listed']
with open('busPosition.csv', 'w') as file:
    for header in header:
        file.write(str(header)+', ')
    file.write('\n')
    for row in bus.keys():
        file.write(row + ', ' + bus[row][0] + ', ' + bus[row][1] + ', 2, ')
        file.write('\n')

        # sql = "INSERT INTO busPosition(id, longitude, latitude, date) VALUES (%s, %s, %s, %s)"
        # val = (row, bus[row][0], bus[row][1], datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        # mycursor.execute(sql, val)
        # mydb.commit()

nouveau = sha256sum('./busPosition.csv')

if ancien == nouveau:
    print("pas de changement")