#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

osascript <<-EOF
tell application "Spotify"
    set current_track_url to null
    set old_player_state to null
    set current_complete_song_id to null
    set current_path_posix to "$DIR/tmp_current_song.txt"
    set current_artist to null
    set current_song to null

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

            set current_complete_song_id to theSong & "|" & theArtist & "|" & theAlbum
            do shell script "echo " & quoted form of current_complete_song_id & " > " & current_path_posix

            if current_artist ≠ theArtist and current_song ≠ theSong then
                set current_artist to theArtist
                set current_song to theSong
                display notification theAlbum with title theSong subtitle theArtist
            end if
        end if

        if player_state ≠ old_player_state and player_state is "playing" then
            --set current_complete_song_id to "playing|" & theSong & "|" & theArtist & "|" & theAlbum
            --do shell script "echo " & quoted form of current_complete_song_id & " > " & current_path_posix

            --display notification player_state with title theSong subtitle theArtist
        end if

        if player_state ≠ old_player_state and player_state is "paused" then
            --set current_complete_song_id to theSong & "|" & theArtist & "|" & theAlbum
            --do shell script "echo " & quoted form of current_complete_song_id & " > " & current_path_posix

            --display notification player_state with title theSong subtitle theArtist
        end if

        set old_player_state to player_state

        delay 2
    end repeat
end tell
EOF