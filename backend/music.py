import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from env import SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET


def get_country_code(country):
    r = requests.get('https://www.countrycode.org/' + country.lower())
    soup = BeautifulSoup(r.text, "html.parser")
    iso2 = soup.find('h3', {'id': 'iso2'})
    res = iso2.text
    return res.lower()

def get_spotify_playlist(country):
    scope = "playlist-modify-public,playlist-modify-private"
    public = True
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET))
    query = "q=top+songs+" + country
    result = sp.search(q=query, type="playlist")
    # print(result['playlists']['items'], end='\n\n\n\n')
    items = result['playlists']['items']
    item = {}
    for i in items:
        if i is not None:
            item = i
            break
    playlist = item['external_urls']['spotify']
    return playlist

# def get_playlists():


# url = 'https://api.musixmatch.com/ws/1.1/'
mongodb_uri = 'mongodb+srv://leonardgciobanu:7u4AhKVnnMqjc8Gu@hackitall.3mrjg.mongodb.net/?retryWrites=true&w=majority&appName=HackITAll'
# param = 'chart.tracks.get?chart_name=top&page=1&page_size=5&country='
mongo_client = MongoClient(mongodb_uri)
db = mongo_client['quizdb']
collection = db['quizcollection']
countries = collection.distinct("country")
# country_codes = []
# for c in countries:
#     country_codes.append(get_country_code(c))
# r = requests.get(url + param + 'it')
# soup = BeautifulSoup(r.text, "html.parser")
# print(soup)
country_playlists = []
# db.create_collection('playlists')
playlists_collection = db['playlists']
for c in countries:
    d = {}
    p = get_spotify_playlist(c)
    d = {'Top Songs - {}'.format(c): p}
    playlists_collection.insert_one(d)
    

# get_spotify_playlist(countries[0])
res = list(playlists_collection.find({}, {'_id': 0}))
print(res)
