import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from datetime import datetime
from env import SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, mongodb_uri

def get_spotify_playlist(country, playlists_collection):
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET))
    query = "q=top+songs+" + country
    result = sp.search(q=query, type="playlist")
    items = result['playlists']['items']
    playlists = []
    cnt = 1
    for item in items:
        if item is not None and cnt <= 5:
                playlist = item['external_urls']['spotify']
                playlists_collection.update_one({"name": "Top Songs - {} {}".format(country, cnt)}, {"$set":{"link": playlist}}, upsert=True)
                cnt += 1
    pass

def update_country_playlists():
    mongo_client = MongoClient(mongodb_uri)
    db = mongo_client['quizdb']
    collection = db['quizcollection']
    countries = collection.distinct("country")

    # db.create_collection('playlists')
    playlists_collection = db['playlists']
    # playlists_collection.drop()
    for c in countries:
        get_spotify_playlist(c, playlists_collection)
    pass

def update_daily_holiday():
    month = datetime.today().strftime('%B')
    day = datetime.today().strftime('%d')
    if day[0] == '0':
        day = day[1:]
    path = month.lower() + '-' + day + '-holidays/'
    today = month.lower() + '-' + day
    r = requests.get('https://nationaltoday.com/' + path)
    soup = BeautifulSoup(r.text, "html.parser")
    res = soup.find('div', attrs={'class':'day-content'})
    day_info = res.text

    mongo_client = MongoClient(mongodb_uri)
    db = mongo_client['quizdb']
    collection = db['daily_holiday']
    collection.drop()
    db.create_collection('daily_holiday')
    collection = db['daily_holiday']
    collection.insert_one({'date': today, "description": day_info})
    # print(day_info)
    pass

