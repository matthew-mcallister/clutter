import logging
import os
from pathlib import Path

from dotenv import load_dotenv


logger = logging.getLogger('clutter')
logger.setLevel(logging.INFO)


env = os.getenv('ENV', 'development')
load_dotenv('.env_' + env)


class Config:
    host: str = 'localhost'
    port: int = 5000
    static_url_path: str = 'static'

    _static_dir: Path | None = None

    @property
    def static_dir(self) -> Path:
        if self._static_dir:
            return self._static_dir
        p = Path(os.getenv('STATIC_DIR', '~/.local/state/clutter')).expanduser()
        logger.info(f'Creating {p}')
        p.mkdir(parents=True, exist_ok=True)
        self._static_dir = p
        return p

    @property
    def upload_dir(self) -> Path:
        return self.static_dir


config = Config()
