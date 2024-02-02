import functools
from typing import Callable, TypeVar, Any

import jsonschema
from flask import request

from clutter import error


F = TypeVar('F', bound=Callable)


def validate_json(schema: dict | None = None) -> Callable[[F], F]:
    def decorator(f: F) -> F:
        @functools.wraps(f)
        def wrapped(*args, **kwargs) -> Any:
            if request.method in ('POST', 'PUT', 'PATCH'):
                json = request.get_json()
                if not json:
                    raise error.ValidationException('Expected valid JSON content')
                if schema:
                    try:
                        jsonschema.validate(json, schema)
                    except Exception as e:
                        raise error.ValidationException(str(e))
            return f(*args, **kwargs)
        return wrapped  # type: ignore
    return decorator