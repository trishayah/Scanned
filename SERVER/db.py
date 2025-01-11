from pymongo import MongoClient

def db_connect():
    client = MongoClient("mongodb://localhost:27017")
    database = client.Scanned
    profiles = database.HCI
    return profiles