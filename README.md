# Lyriks :musical_note:

A minimal application to displays Lyrics from Spotify :star2:

![](https://cloud.githubusercontent.com/assets/811759/20074826/24012500-a532-11e6-8e60-80df1f5cd532.png)

## Why ?

Cause Spotify is no more allows us to sing like a crazy b**ch throught their own application.
Frustrated :disappointed:, I constantly search on google the lyrics to sing.. but it's a bit cumbersome :scream:

So I decided to build a little application to do it automatically.
I intended to use M.X API wich is legal but incomplete and their interface make me want to hang myself.

I have honest intention but nothing let me do honest thing..

...... so I use some little dark things.. :scream: :police_car: :police_car: :police_car: :police_car:

## Behind the hood

Basically, the desktop app listen for Spotify current track. Then the desktop app notifies a server in order to get back the appropriate lyrics.

```
+---------------+
|               |                             +--------------------+
|    Spotify    |                             |                    |
|               |                             |     API Service    |
+-----+---------+                             |                    |
      ^                                       |  (codename: Iron)  +------------------------------------+
      |                                       |     (Flask, RQ)    |                                    |
      | listen                                |                    |                                    | 5. Broker RQ song
      |                                       +--------+-----------+                                    |
  +---+-----------+                                    ^                                                v
  |               |                                    |                                            +---+------------------+
  |  applescript  +<------------+                      |                                            |                      |
  |               |             |                      |                                            |   Worker Service     |
  +---+-----------+             |                      | 4. -X POST -d song iron/shit               |                      |     6. => Scrap like a
      |                         |                      |                                            |                      |           f****** schlag
      |                         |                      |                                            |  (codename: Rogue)   +----------------------------> ???? (Target of hell)
      | write song              | 1. launch            |                                            |    ( Flask, RQ)      |       7. <= lyrics
      |                         |                      |                                            |                      |
      v                      +--+----------------------+------------+                               +--------+-------------+
  +---+-----------+          |                                      |                                        |
  |               |          |               Desktop App            |                                        |
  | tmp_file.txt  |          |        (electron, react, redux ...)  |                                        | 8. -X POST -d lyrics flash/flash
  |               |          |                                      |                                        |
  +---+-----------+          +--+-------------+-----------------+---+                                        |
      ^                         |             |                 ^                                            v
      |                         |             |                 |                                +-----------+-------------+
      |   2. <= watch           |             |                 |     1. => subscribe            |                         |
      +-------------------------+             |                 +------------------------------->+    Notifier Service     |
         3. => new song                       |                       9. <= lyrics               |                         |
                                              |                                                  |    (codename: Flash)    |
                                              |                                                  |  (expressJS, socket.io) |
                                              |                                                  |                         |
                                              |                                                  +-------------------------+
                                              |
                                              |
                           ---                |
                          /   \               v
                          \   /
                           ---      10. SING like a bi*c*
                           | |
                           | |
                           | |
                           +-+
```

## WARNING :warning:

**There is a missing script `worker.py`. Done on purpose cause it is prohibited by the target website. If needed, send me an email**

## LAUNCH LYRIKS Desktop APP

```
cd src/browser
nvm use
npm install
npm start
```

**TODO finish frontend and make build**

## LAUNCH LYRIKS Servers with docker-compose

**Recommanded as all the magic is builded with just one f**king shit command**

```
docker-compose up -d
```

:clap: :clap: :clap:

**But if you're interested to launch each of them, just follow the below instructions**

```bash
# IRON API Service
docker build -t sovanna/lyriks-iron -f src/iron/Dockerfile.iron src/iron/
docker run -d -p 5001:5001 --name "lyriks-iron" sovanna/lyriks-iron

# ROGUE WORKER Service
docker build -t sovanna/lyriks-rogue -f src/iron/Dockerfile.rogue src/iron/
docker run -d --name "lyriks-rogue" sovanna/lyriks-rogue

# FLASH NOTIFIER Service
docker build -t sovanna/lyriks-flash src/flash/
docker run -d -p 5002:5002 --name "lyriks-flash" sovanna/lyriks-flash
```

## Test iron and flash with curl

##### Curl Iron

`curl -X POST -d '{}' -H 'Content-Type: application/json' localhost:5001/shit`

```
{
  "code": 400,
  "error": "Bad Request",
  "message": "Missing data"
}
```

##### Curl Flash

`curl -X POST http://localhost:5002/flash`


```
send lyriks to nowhere
```

## Improvements :car:

* need to save lyrics in order to avoid constantly requesting the target.
* properly saved socket client and not in memory
* automatically follow song with lyrics
* ..maybe some other things to be secure