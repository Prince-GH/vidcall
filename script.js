const option = document.querySelector('.option');


document.getElementById('join-btn-aiml').addEventListener('click', function() {
const APP_ID = "4b955d6488cc40e19d02c5bd79d55191";
const TOKEN = "007eJxTYLBba/eXKblJycNrxQ5enpTffz8/3bTjbcbC3c1/vq0SSStSYDBJsjQ1TTEzsbBITjYxSDW0TDEwSjZNSjG3TDE1NbQ0TGrUSm8IZGS4+ZCHmZEBAkF8FobEzNwcBgYAvqAgzg==";
const CHANNEL = "aiml";  // Fixed typo

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
    
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);  

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
    option.style.display = 'none';
    document.getElementById('C').style.display='flex';
    document.getElementById('join-btn-aiml').style.display = 'none';
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
    option.style.display = 'grid';
    document.getElementById("C").style.display = 'none';
    document.getElementById('join-btn-aiml').style.display = 'block'
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


document.getElementById('join-btn-aiml').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mute-btn').addEventListener('click',toggleMic)
document.getElementById('camera-btn').addEventListener('click',toggleCamera)
});


document.getElementById('join-btn-football').addEventListener('click', function() {
    const APP_ID = "42fdb39061b24131aed42a7549be9064";
    const TOKEN = "007eJxTYJjWcEEjpLPc29WhhH3J4b0bmBV2rmFZ/Um7Prx1XTHzGiUFBhOjtJQkY0sDM8MkIxNDY8PE1BQTo0RzUxPLpFSgqMmlRq30hkBGhtvmm1kZGSAQxOdgSMvPL0lKzMlhYAAAR2Yfag==";
    const CHANNEL = "football";  // Fixed typo
    
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    
    let localTracks = [];
    let remoteUsers = {};
    
    let joinAndDisplayLocalStream = async () => {
        
        client.on('user-published', handleUserJoined)
        client.on('user-left', handleUserLeft)
        
        let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);  
    
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
        option.style.display = 'none';
        document.getElementById('C').style.display='flex';
        document.getElementById('join-btn-football').style.display = 'none';
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
        option.style.display = 'grid';
        document.getElementById("C").style.display = 'none';
        document.getElementById('join-btn-football').style.display = 'block'
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
    
    
    document.getElementById('join-btn-football').addEventListener('click', joinStream)
    document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
    document.getElementById('mute-btn').addEventListener('click',toggleMic)
    document.getElementById('camera-btn').addEventListener('click',toggleCamera)
});


document.getElementById('join-btn-coding').addEventListener('click', function() {
    const APP_ID = "9a2d808bb3e04197a3c8575731eff411";
const TOKEN = "007eJxTYDj9qn6m/7oT0u0PCtssb6TYmR2aZOba5fjMQTvHWGPLRGkFBmPz1JQ0c2NjYzPLFBPjRNPEFFOjVAtT8zTDtMRUQ8vk/y1a6Q2BjAyJVQYMjFAI4rMxJOenZOalMzAAAHskH4Y=";
const CHANNEL = "coding";  // Fixed typo

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
    
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);  

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
    option.style.display = 'none';
    document.getElementById('C').style.display='flex';
    document.getElementById('join-btn-coding').style.display = 'none';
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
    option.style.display = 'grid';
    document.getElementById("C").style.display = 'none';
    document.getElementById('join-btn-coding').style.display = 'block'
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


document.getElementById('join-btn-coding').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mute-btn').addEventListener('click',toggleMic)
document.getElementById('camera-btn').addEventListener('click',toggleCamera)
});


document.getElementById('join-btn-english').addEventListener('click', function() {
    const APP_ID = "64a71989a2cc48c080083c428f207b04";
const TOKEN = "007eJxTYPj5WeOYLMtZptnFxrX1q8sN9i85+9MyxcXUwSRM4/XipzUKDMZGiYamRgamaUmGqSYmpqZJZsnmFskpliaGyQbGiYaGJ1q10hsCGRn8TwSwMjJAIIjPzpCal56TWZzBwAAAh+4f6A==";
const CHANNEL = "english";  // Fixed typo

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
    
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);  

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
    option.style.display = 'none';
    document.getElementById('C').style.display='flex';
    document.getElementById('join-btn-english').style.display = 'none';
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
    option.style.display = 'grid';
    document.getElementById("C").style.display = 'none';
    document.getElementById('join-btn-english').style.display = 'block'
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


document.getElementById('join-btn-english').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mute-btn').addEventListener('click',toggleMic)
document.getElementById('camera-btn').addEventListener('click',toggleCamera)
});
