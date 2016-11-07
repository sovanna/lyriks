# -*- coding: utf-8 -*-
"""
    Iron run.py
    ~~~~~~~~~~~

    START the IRON.
    This file has to be call by uWSGI for example.

    :copyright: (c) 2016 by Sovanna Hing<sovanna.hing@gmail.com>
"""

from server import app

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
