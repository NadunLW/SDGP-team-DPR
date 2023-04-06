from flask import Flask, Response
from model import model


app = Flask(__name__)

@app.route('/video_feed')
def index():
    return Response(model(), mimetype='multipart/x-mixed-replace; boundary=frame' )

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')