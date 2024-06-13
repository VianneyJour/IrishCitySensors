from dash import Dash, html, dcc
import plotly.express as px
from dash.dependencies import Input, Output
import pandas as pd
import os

api = 0

app = Dash(__name__)

# This makes the actual map
df = pd.read_csv("./busPosition.csv")
df.dropna(axis=0, how='any', inplace=True)

fig = px.scatter_mapbox(df,
                        lat=" Longitude",
                        lon=" Latitude",
                        hover_name="id",
                        hover_data=[" Longitude", " Latitude"],
                        zoom=8,
                        height=800,
                        width=800)

fig.update_layout(mapbox_style="open-street-map")
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
# fig['layout']['uirevision'] = 'something'


app.layout = html.Div([
    html.H1('Bus Location Tracker'),
    dcc.Graph(id='map', figure=fig),
    dcc.Interval(
            id='interval-component',
            interval=7000, # in milliseconds
            n_intervals=0
        )
])


@app.callback(Output('map', 'figure'),
              Input('interval-component', 'n_intervals'))
def update_map(interval):
    global api

    if api == 0:
        os.system("python collect1.py")
    elif api == 1:
        os.system("python collect2.py")
    elif api == 2:
        os.system("python collect3.py")
    elif api == 3:
        os.system("python collect4.py")
    api = (api+1) % 4
    os.system("python parser.py")

    bus_location = pd.read_csv("./busPosition.csv")
    bus_location.dropna(axis=0, how='any', inplace=True)

    fig = px.scatter_mapbox(bus_location,
                            lat=" Longitude",
                            lon=" Latitude",
                            hover_name="id",
                            hover_data=[" Longitude", " Latitude"],
                            zoom=5,
                            height=800,
                            width=800,
                            center= {'lat': 0, 'lon': 0})
    fig.update_layout(mapbox_style="open-street-map")
    fig.update_layout(margin={"r": 0, "t": 0, "l": 0, "b": 0})
    fig.update_layout(uirevision='something')

    return fig

if __name__ == '__main__':
    app.run_server(debug=True)