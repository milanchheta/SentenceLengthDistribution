#!/usr/local/bin/python3 

'''
function to get items from cache i.e 
the collections from firestore
'''

#Import statements
from flask import escape
import json
from google.cloud import firestore

#function to get items from cache
def get_cache_results(request):

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

        if request_args and 'inputURL' in request_args:
            input_url = request_args['inputURL']
            db = firestore.Client()
            docs = db.collection(u'cached_results').where(u'input_url', u'==', input_url).stream()
            data={}
            for doc in docs:
                data=json.dumps(doc.to_dict())
                
            #response on no errors
            return (data, 200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
        else:
            #response if no valid request is made
            return ("Error occured", 400, {'Access-Control-Allow-Origin': '*'})
    except:
        #response if internal error occurs
        return ("Error occured", 500, {'Access-Control-Allow-Origin': '*'})