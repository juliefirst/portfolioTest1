var localStream;
var pc1;
var pc2;
var offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

var video = document.getElementById('video');
var remote = document.getElementById('remote');

$(document).ready(function(){
	startWebcam();
});

function startWebcam() {
	navigator.mediaDevices.getUserMedia({
	  audio: true,
	  video: true
	})
	.then(gotStream)
	.catch(onError);
}

function gotStream(stream) {
  video.srcObject = stream;
  localStream = stream;
  video.autoplay = true;
}

function onError() {}

function call() {

	  var servers1 = null;
	  var servers2 = {"name": "curry"};
  pc1 = new RTCPeerConnection(servers1);
  pc1.onicecandidate = function(e) {
	onIceCandidate(pc1, e); //pc2.addIceCandidate(event.candidate)
  };
  
  pc2 = new RTCPeerConnection(servers2);
  pc2.onicecandidate = function(e) {
	  console.log('pc2 event.candidate: ' + e.candidate)
    onIceCandidate(pc2, e); //pc1.addIceCandidate(event.candidate)
  };

  pc2.onaddstream = gotRemoteStream;
  pc1.addStream(localStream);
  
  pc1.createOffer(
    offerOptions
  ).then(
    onCreateOfferSuccess,
    onCreateSessionDescriptionError
  );
}

function gotRemoteStream(e) {
  remote.srcObject = e.stream;
  video.autoplay = true;
}

function onIceCandidate(pc, event) {
	  console.log('onIceCandidate: ' + event);
  getOtherPc(pc).addIceCandidate(event.candidate).then(
    function() {
    	  console.log('addIceCandidate success');
      },
      function(err) {
    	  console.log(' failed to add ICE Candidate: ');
      }
    );
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

function onCreateOfferSuccess(desc) {
	  console.log('onCreateOfferSuccess desc: ' + desc);
  pc1.setLocalDescription(desc);
  pc2.setRemoteDescription(desc);
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    onCreateSessionDescriptionError
  );
}

function onCreateAnswerSuccess(desc) {
	  console.log('onCreateAnswerSuccess desc: ' + desc);
  pc2.setLocalDescription(desc);
  pc1.setRemoteDescription(desc);
}

function onCreateSessionDescriptionError(error) {
  console.log('Failed to create session description: ' + error.toString());
}