class CommonException(Exception):
    status_code: int = 500
    message: str = 'Internal server error'

    def __str__(self) -> str:
        return self.message

class ValidationException(CommonException):
    status_code: int = 400
    message: str = 'Invalid input'

class AuthenticationException(CommonException):
    status_code: int = 401
    message: str = 'Authentication failed'
