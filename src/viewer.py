import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import mysql.connector

df = pd.read_csv("./busPosition.csv")
df.dropna(axis=0, how='any', inplace=True)

fig = px.scatter_mapbox(df,
                        lat=" Longitude",
                        lon=" Latitude",
                        hover_name="id",
                        hover_data=[" Longitude", " Latitude"],
                        zoom=5,
                        height=800,
                        width=800)

fig.update_layout(mapbox_style="open-street-map")
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
fig.show()