from typing import Union
from locator import xy_plane

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def Home():
    xy_plane.poop()
    return {"Home": "is where rey poops"}

@app.get("/hello")
def greetings():
    return {"Hello": "World"}