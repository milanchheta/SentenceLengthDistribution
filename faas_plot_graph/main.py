# #!/usr/local/bin/python3 
import pygal
from flask import escape, render_template

def plot_graph(request):
    if request.method == 'OPTIONS':

        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    data_json = request.get_json()
    if data_json:

            headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/html'
            }
            data=data_json
            data={int(k):int(v) for k,v in data.items()}
            th=[(data[i],i,i+1) if i in data.keys() else (0,i,i+1) for i in range(0,max(data.keys())+1)]
            hist = pygal.Histogram(title=u'Sentence Distribution', x_title='Length of sentences',y_title='Frequency of lengths')
            hist.add('Occurences', th)
            histPlot=hist.render_data_uri()
            return (render_template('test.html', histPlot=histPlot), 200, headers)
   
    return (request, 404, {'Access-Control-Allow-Origin': '*'})

