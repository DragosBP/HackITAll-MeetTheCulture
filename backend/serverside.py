from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import random
from updates import update_country_playlists, update_daily_holiday, get_cooking_recipes, import_new_events
from env import mongodb_uri as uri

app = Flask(__name__)
CORS(app)

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

@app.route('/discard-event', methods=['POST'])
def discard_event():
    data=request.json
    db = mongo.cx["quizdb"]
    collection = db.events
    id = int(data['id'])
    collection.delete_one({'id': id})
    return jsonify({})

@app.route('/music', methods=['GET'])
def get_top_playlists():
    update_country_playlists()
    db = mongo.cx["quizdb"]
    collection = db.playlists
    results = list(collection.find({}, {'_id': 0}))
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

@app.route('/add-suggestion', methods=['POST'])
def add_suggestion():
    data = request.json
    db = mongo.cx["quizdb"]
    collection = db.pending_suggestions
    size = collection.estimated_document_count()
    data['id'] = size
    collection.insert_one(data)
    res = list(collection.find({}, {'_id': 0}))
    return jsonify(res)

@app.route('/get-suggestion', methods=['GET'])
def get_suggestion():
    db = mongo.cx["quizdb"]
    collection = db.pending_suggestions
    res = list(collection.find({}, {'_id': 0}))
    return jsonify(res)

@app.route('/approve-suggestion', methods=['POST'])
def approve_suggestion():
    data=request.json
    db = mongo.cx["quizdb"]
    collection = db.pending_suggestions
    id = int(data['id'])
    res = list(collection.find({'id': id}, {'_id':0}))[0]
    
    if data['approve'] == 'True':
        # r = db.create_collection('events')
        events = db.events
        events.insert_one(res)
    collection.delete_one({'id': id})
    return jsonify({})

@app.route('/get-events', methods=['GET'])
def get_events():
    db = mongo.cx["quizdb"]
    collection = db.events
    results = list(collection.find({}, {'_id': 0}))
    return jsonify(results)

@app.route('/import-events', methods=['GET'])
def import_event():
    # import_new_events()
    db = mongo.cx["quizdb"]
    collection = db.events
    r = list(collection.find({}, {'_id': 0}))
    return jsonify(r)

if __name__ == "__main__":
    app.run(debug=True)