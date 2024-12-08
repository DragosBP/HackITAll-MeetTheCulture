from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import random
from updates import update_country_playlists, update_daily_holiday, get_cooking_recipes

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://leonardgciobanu:7u4AhKVnnMqjc8Gu@hackitall.3mrjg.mongodb.net/?retryWrites=true&w=majority&appName=HackITAll"

app.config["MONGO_URI"] = uri
mongo = PyMongo(app)
id = -1
def get_id():
    global id
    id = id + 1
    return id

# client = pymongo.MongoClient(uri)

@app.route('/add', methods=['POST'])
def add_items():
    data = request.json
    db = mongo.cx["myDatabase"]
    collection = db.quiz
    inserted_id = collection.insert_one(data).inserted_id
    return jsonify({"message": "Item added", "id": str(inserted_id)})

@app.route('/items', methods=['GET'])
def get_items():
    db = mongo.cx["quizdb"]
    collection = db.quizcollection
    items = list(collection.find({}, {"_id": 0}))
    return jsonify(items)

@app.route('/quiz/all', methods=['GET'])
def get_all_quiz():
    db = mongo.cx["quizdb"]
    collection = db.quizcollection
    countries = collection.distinct("country")
    todays_country = random.choice(countries)
    items = list(collection.find({"country": todays_country}, {"_id": 0, "ca": 0}))
    return jsonify(items)
    
@app.route('/all/quiz', methods=['GET'])
def all_quizez():
    db = mongo.cx["quizdb"]
    collection = db.quizcollection
    items = list(collection.find({}, {"_id": 0}))
    return jsonify(items)

@app.route('/verify', methods=['POST'])
def verify():
    data = request.json
    db = mongo.cx["quizdb"]
    collection = db.quizcollection
    reply = []
    for answer in data:
        question = list(collection.find({"id": answer.get('id')}, {"_id": 0}))
        q = question[0]
        if question[0].get('ca') == answer.get('ans'):
            q['correct'] =  True
        else:
            q['correct'] = False
        reply.append(q)

    return jsonify(reply)

@app.route('/music', methods=['GET'])
def get_top_playlists():
    update_country_playlists()
    db = mongo.cx["quizdb"]
    collection = db.playlists
    results = list(collection.find({}, {'_id': 0}))
    print(results)
    return jsonify(results)

@app.route('/daily-holiday', methods=['GET'])
def get_daily_holiday():
    update_daily_holiday()
    db = mongo.cx["quizdb"]
    # r = db.create_collection('daily_holiday')
    collection = db.daily_holiday
    result = list(collection.find({}, {'_id': 0}))[0]
    return jsonify(result)

@app.route('/get-cooking-recipes', methods=['GET'])
def add_cooking_recipes():
    # get_cooking_recipes()
    db = mongo.cx["quizdb"]
    collection = db.recipes
    results = list(collection.find({}, {'_id': 0}))
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)