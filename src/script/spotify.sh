#!/usr/bin/env bash

osascript <<-EOF
tell application "Spotify"
    set current_track_url to null
    set old_player_state to null

    repeat until application "Spotify" is not running
        set track_url to spotify url of current track

        if the player state is stopped then
            set player_state to "stopped"
            try
                if current track is not missing value then set player_state to "paused"
            end try
        else if the player state is paused then
            set player_state to "paused"
        else
            set player_state to "playing"
        end if

        if track_url ≠ current_track_url then
            set current_track_url to spotify url of current track
            set theSong to name of current track
            set theAlbum to album of current track
            set theArtist to artist of current track
            display notification theArtist with title theSong subtitle theAlbum
        end if

        if player_state ≠ old_player_state and player_state is "playing" then
            display notification player_state with title theSong subtitle theAlbum
        end if

        if player_state ≠ old_player_state and player_state is "paused" then
            display notification player_state with title theSong subtitle theAlbum
        end if

        set old_player_state to player_state

        delay 2
    end repeat
end tell
EOF