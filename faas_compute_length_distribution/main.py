#!/usr/local/bin/python3 

'''
function to calculate the sentence length 
distribution and return a dictionaly object
'''

#Import statements
from flask import escape
import urllib.request
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize
import json

#function to calculate the sentence length distribution
def text_processing(request):

    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    try:
        request_args = request.args
        inputURL=""
        if request_args and 'inputURL' in request_args:
            inputURL = request_args['inputURL']
            
            with urllib.request.urlopen(inputURL) as response:
                raw = response.read().decode('utf8')
                sentenceList=sent_tokenize(raw)

            distribution={}
            for sentence in sentenceList:
                if len(sentence) not in distribution:
                    distribution[len(sentence)]=1
                else:
                    distribution[len(sentence)]+=1

            #response on successfull calulation of sentence distribution
            return (json.dumps(distribution), 200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
        else:
            #response if no valid request is made
            return ("Error occured", 400, {'Access-Control-Allow-Origin': '*'})
    except:
        #response if internal error occurs
        return ("Error occured", 500, {'Access-Control-Allow-Origin': '*'})