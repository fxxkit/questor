import random, json
from nltk.corpus import names, words

centlat = 25.0562402
centlng = 121.6241145

male = names.words('male.txt')
female = names.words('female.txt')
people = male + female 
typeNameList = ["banana","water","dog","god","apple"]

eng_words = words.words()

mock = []

for taskId, i in enumerate(xrange(300)):
    sign = -1 if random.randrange(2) == 1 else 1
    lat = centlat + sign*(random.randrange(500)/10000.0)
    sign = -1 if random.randrange(2) == 1 else 1
    lng = centlng + sign*(random.randrange(1000)/10000.0)
    title = random.choice(eng_words) + ' and ' + random.choice(eng_words)
    name = random.choice(people)
    owner_uid = random.randint(1,20)
    task_type = random.randint(0,4)
    task_typeName = typeNameList[task_type]
    mock.append({'lat':round(lat,6), 'lng':round(lng,6), 'name':name, 'title':title, 'taskId': taskId, 'typeId': task_type, 'typeName' : task_typeName , 'owner_uid' : owner_uid})


json.dump(mock, open('mock.json','w'), indent=4)
