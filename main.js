const APP_ID = "4b955d6488cc40e19d02c5bd79d55191";
const TOKEN = "007eJxTYFj9Y43DbYt5X89slPyiMP/H/qXxe1TaWCev7djenqIl48GswGCSZGlqmmJmYmGRnGxikGpomWJglGyalGJumWJqamhpyBe/OK0hkJHhLKc5EyMDBIL4LAy5iZl5DAwAndEfIw==";
const CHANNEL = "main";  // Fixed typo

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);  // Fixed typo

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video-container" id="user-container-${UID}">
                      <div class="video-player" id="user-${UID}"></div>
                  </div>`;
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);  // Changed beforebegin to beforeend

    localTracks[1].play(`user-${UID}`);  // Fixed string interpolation

    await client.publish([localTracks[0], localTracks[1]]);
};

let joinStream = async () => {
    await joinAndDisplayLocalStream();
    document.getElementById('join-btn').style.display = 'none';
    document.getElementById('stream-controls').style.display = 'flex';
};

let handleUserJoined = async (user, mediaType) =>{
    remoteUsers[user.uid] = user
    await client.subscribe(user,mediaType)

    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player != null){
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                      <div class="video-player" id="user-${user.uid}"></div>
                  </div>`;

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);  // Changed beforebegin to beforeend

         user.videoTrack.play(`user-${user.uid}`)
    }
    if( mediaType === 'audio'){
        user.audioTrack.play();
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    document.getElementById('join-btn').style.display = 'block'
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('video-streams').innerHTML = ''
}

let toggleMic = async (e) =>{
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerHTML = 'Mic On'
        e.target.style.backgroundColor = "linear-gradient(25deg,rgb(12, 143, 125),rgb(16, 112, 99))"
        e.target.style.border = "none";
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerHTML = 'Mic off'
        e.target.style.border = "1px solid red"
    }
}

let toggleCamera = async (e) =>{
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerHTML = 'Camera on'
        e.target.style.backgroundColor = 'linear-gradient(25deg,rgb(12, 143, 125),rgb(16, 112, 99))'
        e.target.style.border = "none";
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerHTML = 'Camera off'
        e.target.style.border = "1px solid red"
        }
}


document.getElementById('join-btn').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mute-btn').addEventListener('click',toggleMic)
document.getElementById('camera-btn').addEventListener('click',toggleCamera)