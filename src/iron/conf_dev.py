# -*- coding: utf-8 -*-
"""
    IRON config.py
    ~~~~~~~~~~~~~~

    Config file for 'DEV' environement.
    See `config_prod.py` for 'PROD' environement.

    :copyright: (c) 2016 by Sovanna Hing<sovanna.hing@gmail.com>
"""

# APP
API_NAME = 'Iron lyriks'
API_VERSION = 'Config Local, 1.0.0-alpha'
DEBUG = True

# CACHE KEYs
CACHE_ROOT_KEY = 'iron:lyriks:dev'

# REDIS
REDIS_HOST = 'redis'
REDIS_PORT = 6379

# RQ WORKER QUEUEs
QUEUES = ['scrapthor']
