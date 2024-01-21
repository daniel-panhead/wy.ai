from typing import Union
from locator import xy_plane as plane

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def Home():
    return {"Home": "is where rey poops"}

@app.get("/hello")
def greetings():
    return {"Hello": "World"}


@app.get("/coords")
def coords():
    lengthx = plane.q2_xaxis_length(1,2)
    lengthy = plane.q1_yaxis_length(1,4)
    return {"x" : plane.x_coord(lengthx), "y" : plane.y_coord(lengthy)}

