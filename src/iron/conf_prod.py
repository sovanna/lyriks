# -*- coding: utf-8 -*-
"""
    IRON config.py
    ~~~~~~~~~~~~~~

    Config file for 'PROD' environement.
    See `config_dev.py` for 'DEV' environement.

    :copyright: (c) 2016 by Sovanna Hing<sovanna.hing@gmail.com>
"""

# APP
API_NAME = 'Iron lyriks'
API_VERSION = 'Config Prod, 1.0.0-alpha'
DEBUG = False

# CACHE KEYs
CACHE_ROOT_KEY = 'iron:lyriks:prod'

# REDIS
REDIS_HOST = 'redis'
REDIS_PORT = 6379

# RQ WORKER QUEUEs
QUEUES = ['scrapthor']
