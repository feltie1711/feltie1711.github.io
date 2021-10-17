function play_audio(music)
{
document.getElementById("audio_player").pause();
document.getElementById("audio_player").setAttribute('src', music);
document.getElementById("audio_player").load();
document.getElementById("audio_player").play();

}