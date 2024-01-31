from typing import Any
from pathlib import Path
from hashlib import sha256

import requests
from flask import Blueprint
from flask import request

from clutter import error
from clutter.config import config
from clutter.util import validate_json


bp = Blueprint('main', __name__)


_CONTENT_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
}

def content_type_to_extension(content_type: str) -> str | None:
    return _CONTENT_TYPE_MAP.get(content_type)


def download(src_url: str) -> Path:
    headers = {
        'Accept': 'image/png; image/jpeg',
    }
    response = requests.get(src_url, headers=headers)
    if response.status_code >= 300:
        raise error.ValidationException
    content_type = response.headers.get('Content-Type')
    if not content_type:
        raise error.ValidationException('Missing content type')
    extension = content_type_to_extension(content_type)
    if not extension:
        raise error.ValidationException('Invalid content type: ' + content_type)
    data = response.content
    sha = sha256(data)
    p = config.download_dir / f'{sha.hexdigest()}.{extension}'
    p.write_bytes(data)
    return p


@bp.post('/images')
@validate_json({
    'type': 'object',
    'required': ['source_url'],
    'properties': {
        'source_url': {'type': 'string', 'format': 'url'},
    },
})
def images() -> Any:
    assert request.json
    download(request.json['source_url'])
    return '', 200
