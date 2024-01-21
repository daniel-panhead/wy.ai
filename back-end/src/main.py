from typing import Union
from locator import xy_plane as plane
from locator import base_distance

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

class Angle(BaseModel):
    room: str
    role : str
    angles: list

app = FastAPI()
current_child = {}

origins = [
    "http://localhost",
    "https://localhost:5173",
    "https://wyai.netlify.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def Home():
    return JSONResponse(content=jsonable_encoder({"Home": "is where rey poops"}))

@app.get("/hello")
def greetings():
    return JSONResponse(content=jsonable_encoder({"Hello": "Rey"}))


@app.post("/coords")
async def coords(angles: Angle):
    d1 = base_distance.base_distance(angles.angles[0])
    d2 = base_distance.base_distance(angles.angles[1])
    d3 = base_distance.base_distance(angles.angles[2])
    lengthx = plane.q2_xaxis_length(d1,d2)
    lengthy = plane.q1_yaxis_length(d1,d3)
    
    return_obj = {}
    return_obj[angles.role] = {"room" : angles.room, "role" : angles.role, "x" : plane.x_coord(lengthx), "y" : plane.y_coord(lengthy)}

    if (angles.role == "child"):
        current_child["child"] = return_obj["child"]
    if (angles.role == "parent"):
        return_obj["child"] = current_child["child"]

    return JSONResponse(content=jsonable_encoder(return_obj))

