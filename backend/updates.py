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

    # url = 'https://iso3166-updates.com/api/name/' + country
    url = 'https://flagcdn.com/en/codes.json'
    r = requests.get(url)
    # soup = BeautifulSoup(r.text, "lxml")
    # code = soup.text[2:4]
    # print(code, end='\n\n\n')
    content = r.json()
    for key, value in content.items():
         if value == country:
              code = key
    # print(code, end='\n\n')
    img = 'https://flagcdn.com/256x192/{}.png'.format(code)

    cnt = 1
    for item in items:
        if item is not None and cnt <= 5:
                # img = 
                playlist = item['external_urls']['spotify']
                playlists_collection.update_one({"name": "Top Songs - {} {}".format(country, cnt)}, {"$set":{"link": playlist, "img": img}}, upsert=True)
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

def get_cooking_recipes():
    # url = 'https://www.bbcgoodfood.com/recipes/category/cuisine-collections'
    # r = requests.get(url)
    # soup = BeautifulSoup(r.text, "html.parser")
    
    
    # mongo_client = MongoClient(mongodb_uri)
    # db = mongo_client['quizdb']
    # db.create_collection('recipes')
    # collection = db['recipes']
    # recipes = list(collection.find({}, {'_id': 0}))
    # for rec in recipes:
    #     food_type = rec.get('food_type')
    #     result = soup.find('article', attrs={'data-item-name': food_type})
    #     image = result.img
    #     image = image['src']
    #     collection.update_one({'food_type': food_type}, {'$set': {'img': image}})
        # print(image)
    # for recipe in res[:-2]:
    #     linkdiv = recipe.a
    #     link = linkdiv['href']
    #     link = url + link
    #     # print(linkdiv)
    #     food_type = linkdiv.h2.text
    #     collection.insert_one({'food_type': food_type, 'link': link})
    #     # print(food_type, link)
    pass
