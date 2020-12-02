# #!/usr/local/bin/python3 

'''
function to obtain graph from distibution dictionary as input
'''

#Import statements
import pygal
from flask import escape, render_template

#function to obtain graph from distibution dictionary as input
def plot_graph(request):

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
                data=data_json
                
                data={int(k):int(v) for k,v in data.items()}
                th=[(data[i],i,i+1) if i in data.keys() else (0,i,i+1) for i in range(0,max(data.keys())+1)]
                hist = pygal.Histogram(title=u'Sentence Length Distribution', x_title='Length of sentences (w.r.t. characters)',y_title='Frequency of lengths')
                hist.add('Occurences', th)
                histPlot=hist.render_data_uri()

                #response on successfull generation of graph
                return (render_template('test.html', histPlot=histPlot), 200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/html'})
        else:
            #response if no valid request is made
            return ("Error occured", 400, {'Access-Control-Allow-Origin': '*'})
    except:
        #response if internal error occurs
        return ("Error occured", 500, {'Access-Control-Allow-Origin': '*'})