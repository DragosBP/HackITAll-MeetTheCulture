from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import random

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
    data = dict(data)
    question = list(collection.find({"id": data.get('id')}, {"_id": 0}))
    if question[0].get('ca') == data.get('ans'):
        d = {'correct': True}
    else:
        d = {'correct': False, 'ca': question[0].get('ca')}
    question.append(d)
    return jsonify(question)



if __name__ == "__main__":
    # mongo.db.create_collection("quiz")
    app.run(debug=True)