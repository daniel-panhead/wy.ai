from typing import Union

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Home": "is where rey is"}

@app.get("/hello")
def read_root():
    return {"Hello": "World"}