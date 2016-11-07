# -*- coding: utf-8 -*-
"""
    IRON server
    ~~~~~~~~~~~

    The magic starts here. The entry point that will take request
    and send it to the background worker.

    :copyright: (c) 2016 by Sovanna Hing<sovanna.hing@gmail.com>
"""

from flask import Flask
from flask import request
from flask import abort
from flask import make_response
from flask import jsonify
from flask import json

from worker import rogue

app = Flask(__name__)
app.config.from_object("conf_dev")
app.config.from_envvar("CONF_LYRIKS_PROD", silent=True)


@app.errorhandler(400)
def page_bad_request(error):
    return make_response(jsonify({
        "code": 400,
        "error": "Bad Request",
        "message": error.description
    }), 400)


@app.route("/shit", methods=["POST"])
def shit():
    """Ready to go deep into the shit?

        Parse --data from -X POST -H 'Content-Type: application/json'
        and send it to the space background
    """

    try:
        body = json.loads(request.data)
    except Exception as e:
        abort(400, e)

    if not body:
        abort(400, "Missing data")

    if "title" not in body:
        abort(400, "Missing `title` param")

    if "artist" not in body:
        abort(400, "Missing `artist` param")

    if "client_id" not in body:
        """client_id is used to send back
        the lyriks through the Notifier aka Flash.
        """
        abort(400, "Missing `client_id` param")

    # send data to our Background Worker aka Iron Rogue
    rogue(body["title"], body["artist"], body["client_id"])

    return make_response(jsonify({
        "code": 202,
        "message": "request accepted and send into the shit"
    }), 202)