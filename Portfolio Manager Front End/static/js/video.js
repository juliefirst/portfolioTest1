 var video = document.getElementById("video");

//连接WebSocket服务器
console.log('hash: ' + window.location.hash);
rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split('#')[0], window.location.hash.slice(1));

rtc.on("connected", function(socket) {
	//创建本地视频流
	rtc.createStream({
	  "video": true,
	  "audio": true
	});
});

//创建本地视频流成功
rtc.on("stream_created", function(stream) {
	video.src = URL.createObjectURL(stream);
	video.play();
});

//创建本地视频流失败
rtc.on("stream_create_error", function() {
	alert("create stream failed!");
});

//接收到其他用户的视频流
rtc.on('pc_add_stream', function(stream, socketId) {
	sendVideo(1010,socketId);
	var remote = document.getElementById("remote");
	var id = "other-" + socketId;
	remote.setAttribute("class", "other");
	remote.setAttribute("autoplay", "autoplay");
	remote.setAttribute("id", id);
	rtc.attachStream(stream, id);
});