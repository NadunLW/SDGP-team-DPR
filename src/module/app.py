from flask import Flask, Response
from model import model
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return Response(model(), mimetype='multipart/x-mixed-replace; boundary=frame' )

if __name__ == '__main__':
    app.run()