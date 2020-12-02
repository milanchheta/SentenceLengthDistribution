# #!/usr/local/bin/python3 

'''
function to store items in the cache i.e 
in the collections from firestore
'''

#Import statements
from flask import escape
import json
from google.cloud import firestore

#function to store items in the cache
def set_cache_results(request):

    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    try:
        data_json = request.get_json()
        if data_json:
            db = firestore.Client()
            doc_ref = db.collection(u'cached_results').add({
                u'input_url': data_json['input_url'],
                u'output_distribution': data_json['output_distribution'],
                u'output_graph': data_json['output_graph']
            })
            #response on successfull calulation of sentence distribution
            return ("Stored", 200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/text' })
        else:
            #response if no valid request is made
            return ("Error occured", 400, {'Access-Control-Allow-Origin': '*'})
    except:
        #response if internal error occurs
        return ("Error occured", 500, {'Access-Control-Allow-Origin': '*'})