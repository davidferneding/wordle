from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid


class Game:
    def __init__(self, word):
        self.word = word
        self.guesses = []
        self.results = []


games = {}


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/game/start")
def startGame():
    id = str(uuid.uuid4())
    games.setdefault(id, Game("wordle"))
    return id


@app.get("/game/{id}/guesses")
def getGuesses(id: str):
    if id not in games:
        raise HTTPException(status_code=404, detail="Game not found")

    return games[id].guesses


@app.get("/game/{id}/results")
def getResults(id: str):
    if id not in games:
        raise HTTPException(status_code=404, detail="Game not found")

    return games[id].results


@app.post("/game/{id}/guess")
def guess(id: str, guess: str):
    if id not in games:
        raise HTTPException(status_code=404, detail="Game not found")

    game = games[id]
    if len(game.guesses) > 5:
        raise HTTPException(status_code=400, detail="Guesses exhausted")
    elif len(game.results) > 0 and game.results[-1] == [1]*6:
        raise HTTPException(status_code=400, detail="Game has been won")

    game.guesses.append(guess)
    result = [-1]*6
    for position in range(6):
        if game.word[position] == guess[position]:
            result[position] = 1
        elif game.word.count(guess[position]) > 0:
            result[position] = 0

    game.results.append(result)
    return result
