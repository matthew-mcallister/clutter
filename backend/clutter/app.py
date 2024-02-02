from typing import Any
from flask import Flask, Response, jsonify
from werkzeug.exceptions import HTTPException

from clutter import error
from clutter.config import config
from clutter.routes.item import bp as item_bp


app = Flask(
    __name__,
    static_url_path='/static',
    static_folder=config.static_dir,
)

app.config.update(
    HOST=config.host,
    PORT=config.port,
)

app.register_blueprint(item_bp)


@app.after_request
def add_cors(response: Response) -> Response:
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response


@app.errorhandler(error.CommonException)
def handle_common_exception(e: error.CommonException) -> Any:
    return jsonify(message=str(e)), e.status_code


@app.errorhandler(HTTPException)
def handle_http_exception(e: HTTPException) -> Any:
    return jsonify(message=e.description), e.code


@app.errorhandler(Exception)
def handle_exception(e: Exception) -> Any:
    return jsonify(message=str(e)), 500
