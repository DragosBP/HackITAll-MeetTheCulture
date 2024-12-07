import requests
from pymongo import MongoClient

url = 'https://api.musixmatch.com/ws/1.1/'
mongodb_uri = 'mongodb+srv://leonardgciobanu:7u4AhKVnnMqjc8Gu@hackitall.3mrjg.mongodb.net/?retryWrites=true&w=majority&appName=HackITAll'
# chart.tracks.get?chart_name=top&page=1&page_size=5&country=it
mongo_client = MongoClient(mongodb_uri)
db = mongo_client['quizdb']
collection = db['quizcollection']

r = requests.get('')