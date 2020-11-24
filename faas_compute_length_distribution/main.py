from flask import escape
import urllib.request
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize
import json
def text_processing(request):
    if request.method == 'OPTIONS':

        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_args = request.args
    inputURL=""

    if request_args and 'inputURL' in request_args:
            inputURL = request_args['inputURL']

            headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
            with urllib.request.urlopen(inputURL) as response:
                raw = response.read().decode('utf8')
                sentenceList=sent_tokenize(raw)
            print(sentenceList)
            distribution={}
            for sentence in sentenceList:
                if len(sentence.split())==1:
                    print(sentence)
                if len(sentence.split()) not in distribution:
                    distribution[len(sentence.split())]=1
                else:
                    distribution[len(sentence.split())]+=1
            return (json.dumps(distribution), 200, headers)


    return (request, 404, {'Access-Control-Allow-Origin': '*'})
