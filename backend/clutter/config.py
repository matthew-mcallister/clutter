import logging
import os
from pathlib import Path

from dotenv import load_dotenv


logger = logging.getLogger('clutter')
logger.setLevel(logging.INFO)


env = os.getenv('ENV', 'development')
load_dotenv('.env_' + env)


def get_download_dir() -> Path:
    if conf_path := os.getenv('DOWNLOAD_DIR'):
        return Path(conf_path)
    else:
        p = Path('/tmp/.clutter_downloads')
        logger.info(f'Creating {p}')
        p.mkdir(parents=True, exist_ok=True)
        return p


class Config:
    download_dir: Path = get_download_dir()


config = Config()
