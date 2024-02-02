from clutter.app import app
from clutter.config import config

if __name__ == '__main__':
    app.run(debug=True, port=config.port)