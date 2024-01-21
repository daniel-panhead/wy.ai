from typing import Union
from locator import xy_plane as plane
from locator import base_distance

from fastapi import FastAPI, Request
from pydantic import BaseModel

class Angle(BaseModel):
    room: str
    role : str
    angles: list

app = FastAPI()

@app.get("/")
def Home():
    return {"Home": "is where rey poops"}

@app.get("/hello")
def greetings():
    return {"Hello": "World"}


@app.post("/coords")
async def coords(angles: Angle):

    d1 = base_distance.base_distance(angles.angles[0])
    d2 = base_distance.base_distance(angles.angles[1])
    d3 = base_distance.base_distance(angles.angles[2])
    lengthx = plane.q2_xaxis_length(d1,d2)
    lengthy = plane.q1_yaxis_length(d1,d3)

    return {"room" : angles.room, "role" : angles.role, "x" : plane.x_coord(lengthx), "y" : plane.y_coord(lengthy)}

