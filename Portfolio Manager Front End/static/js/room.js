var room = null;
var stompClient = null;
var locate;
var sayTime;
var role;
var isStart = true;
var isVote = false;
var isPoliceVote = false;
var isSave = false;
var isPoison = false;
var isValidate = false;
var isNight = true;
var isDead = false;
// var isFirstDay = true;
// var isPolice = false;
var beKillPlayer;
var ready = document.getElementById('ready');
var unready = document.getElementById('unready');
// var isLeft = false;

window.onbeforeunload = leaveRoom;
unready.disabled = true;

$(document).ready(function(){
	console.log('ready');
	connect();
	getUser();
	getRoom();
	video();
	getPlayers();
	chat("leftBubble","../img/curry.jpg","text length test");
})

function video(){
	var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    getUserMedia.call(navigator, {
        video: true,
        audio: true
    }, function(localMediaStream) {
        var video = document.getElementById('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        video.onloadedmetadata = function(e) {
            console.log("Label: " + localMediaStream.label);
            console.log("AudioTracks" , localMediaStream.getAudioTracks());
            console.log("VideoTracks" , localMediaStream.getVideoTracks());
        };
    }, function(e) {
        console.log('Reeeejected!', e);
    });
}

function getRoom(){
	var url = 'http://localhost:8080' + window.location.pathname;
	console.log('url: ' + url);
	$.ajax({
		url: url,
		type: 'post',
		async: true,
		success: function(data, status){
			if (data.code == 1){
				room = data.data;
				sayTime = 20;
			}else{
				alert(data.message);
			}
		}
	});
}

function getPlayers(){
	var url = 'http://localhost:8080' + window.location.pathname + '/players';
	// var url = 'http://localhost:8080/rooms/1010/players';
	$.ajax({
		url: url,
		type: 'get',
		async: true,
		success: function(data, status){
			if (data.code == 1){
				refreshPlayers(data.data);
			}else{
				alert(data.message);
			}
		}
	});
}

function refreshPlayers(players){
	resetPlayers();
	players.forEach(function(item, index) {
		var location = index + 1;
		var imgId = "#player" + location + "_img";
		var nameId = "#player" + location + "_name";
		var name = item.name;
		var img = item.portrait;
		var timeId = "player" + location + "_time";
//		var timeCount = "<span id = '" + timeId + "' style='display: inline-block; margin-top: 20px; margin-left: 20px; color: red; font-size:100px;'>60</span>"
		var background = 'url(' + img + ')';
//		$(imgId).html(timeCount);
		$(imgId).css("background-image", background);
		$(imgId).css("background-size", "150px 200px");
		$(nameId).html(name);
		if (item.name == user.name) {
			locate = location;
			$('#locateStatus').html(locate);
		}
	});
}

function resetPlayers() {
	for (var i = 0; i < 16; i++) {
		var imgId = "#player" + i + "_img";
		var nameId = "#player" + i + "_name";
		$(imgId).css("background-image", "");
		$(nameId).html("");
	}
}

function readyAction(){
	var url = 'http://localhost:8080' + window.location.pathname + '/ready';
	// var url = 'http://localhost:8080/rooms/1010/ready';
	$.ajax({
		url: url,
		type: 'get',
		async: true,
		data: {
			"userId": user.id
		},
		success: function(data, status){
			if (data.code == 2){
				sendReadyMessage(1010,locate,"ready");
				console.log('All Ready!');
				ready.disabled = true;
				unready.disabled = false;
				setReady(locate);
			}else if (data.code == 1){
				ready.disabled = true;
				unready.disabled = false;
				console.log('you are ready!');
				sendReadyMessage(1010,locate,"ready");
				setReady(locate);
			}else{
				alert(data.message);
			}
		}
	});
}

function unreadyAction(){
	var url = 'http://localhost:8080' + window.location.pathname + '/unready';
	// var url = 'http://localhost:8080/rooms/1010/unready';
	$.ajax({
		url: url,
		type: 'get',
		async: true,
		data: {
			"userId": user.id
		},
		success: function(data, status){
			if (data.code == 1){
				ready.disabled = false;
				unready.disabled = true;
				console.log('you are unready!');
				sendReadyMessage(1010,locate,"");
				setUnReady(locate);
			}else{
				alert(data.message);
			}
		}
	});
}

function setReady(location){
	var imgId = "#player" + location + "_img";
	var ready = "<span style='display: inline-block; margin-top: 10px; margin-left: 110px; color: white; font-size:20px;'>ready</span>"
	$(imgId).html(ready);
}

function setUnReady(location){
	var imgId = "#player" + location + "_img";
	$(imgId).html("");
}

function clearReady(){
	for (var i = 1; i <= 16; i++) {
		setUnReady(i);
	}
}

function isSay(){
	if (isDead){
		return false;
	}
	return true;
}

function say(message){
	sendSay(room.id, locate);
	sayAction(locate, message);
}

function sayAction(position, message){
	if (position != locate){
		$('#send_btn').addClass('disabled');
	}else{
		$('#send_btn').removeClass('disabled');
	}
	var sayTime = 4;
	var forTime = window.setInterval(function(){
		var timeId = "#player" + position + "_img";
		var timeCount = "<span id = '" + timeId + "' style='display: inline-block; margin-top: 20px; margin-left: 20px; color: red; font-size:100px;'>" + sayTime + "</span>"
		$(timeId).html(timeCount);
		sayTime--;
	}, 1000);
	
	window.setTimeout(function(){
		window.clearInterval(forTime);
		var timeId = "#player" + position + "_img";
		$(timeId).html("");
		sayTime = 4;
		if (position == locate && message != 1){
			sayConfirm(room.id, locate + 1);
		}
		// $.ajax({
		// 	url: 'http://localhost:8080/game/sayDone',
		// 	type: 'get',
		// 	data: {
		// 		'roomId': room.id,
		// 		'location': locate
		// 	},
		// 	async: true,
		// 	success: function(data, status){
		// 		if (data.code == 1){
		// 			if (isLeft){
		// 				sayConfirm(locate - 1);
		// 			}else{
		// 				sayConfirm(locate + 1);
		// 			}
		// 		}else{
		// 			alert(data.message);
		// 		}
		// 	}
		// });
	}, (sayTime + 2) * 1000);
}

function nextSay(){
	sendSay(room.id, locate + 1);
}

function sendMessage(){
    sendChat(1010);
    chat("rightBubble");
    $('.chat-info').val('');
}

function allocateRole(role){
	this.role = role;
	$('#roleStatus').html(role)
	$('#locateStatus').html(locate);
	console.log('get role: ' + role);
}
//*******************************************************************
//
//				游戏逻辑部分
//
//
//*******************************************************************
function gameStart(){
	clearReady();
	$('#gameStart').html("5");
	$('#gameStartMode').modal({backdrop: 'static', keyboard: false});
	$('#gameStartMode').modal('show');
	var timeDown = 4;
	var forTime = window.setInterval(function(){
		$('#gameStart').html(timeDown);
		timeDown--;
	}, 1000);
	
	window.setTimeout(function(){
		$('#gameStartMode').modal('hide');
		window.clearInterval(forTime);
		var timeDown = 4;
		showRole('你的角色为：', role);
	}, (timeDown + 1) * 1000);
}

function gameEnd(which, roles){
	$('#roles').html(which);
	roles.forEach(function(item, index){
		var location = index + 1;
		var id = '#location_' + location;
		$(id).html(item);
	});
	$('#endMode').modal('show');
}

function showGameEnd(){
	$('#endMode').modal('show');
}

function closeEndMode(){
	$('#endMode').modal('hide');
}

function intoNight(){
	if (role == '村民' && !isDead) {
		showNight();
	}else if (role == '预言家' && !isDead) {
		prophet();
	}else if (role == '狼人' && !isDead) {
		wolf();
	}else if (role == '白痴' && !isDead) {
		showNight();
	}else if (role == '猎人' && !isDead) {
		showNight();
	}else if (role == '女巫' && !isDead) {
		showNight();
	}else {
		console.log('你是什么东西？');
	}
}

function showRole(title, role){
	$('#roleTitle').html(title);
	$('#role').html(role);
	$('#RoleMode').modal({backdrop: 'static', keyboard: false});
	$('#RoleMode').modal('show');

	window.setTimeout(function(){
		$('#RoleMode').modal('hide');
		if (isStart) {
			isStart = false;
			intoNight();
		}
		if(isValidate){
			showNight();
			isValidate = false;
		}
	}, 3 * 1000);
}

function showNight(){
	$('#nightMode').modal({backdrop: 'static', keyboard: false});
	$('#nightMode').modal('show');
}

function hideNight(){
	$('#nightMode').modal('hide');
}

function showDay(){
	$('#dayMode').modal({backdrop: 'static', keyboard: false});
	$('#dayMode').modal('show');

	window.setTimeout(function(){
		$('#dayMode').modal('hide');
		// if (isFirstDay){
		// 	isFirstDay = false;
		// 	showPolice();
		// }
		if (isDead){
        	$('#status').html("死亡");
		}
		if (role == '预言家'){
			sayConfirm(room.id, 1);
		}
	}, 3 * 1000);
}

// function showPolice(){
// 	$('#policeMode').modal({backdrop: 'static', keyboard: false});
// 	$('#policeMode').modal('show');
// 	var timeDown = 14;
// 	var forTime = window.setInterval(function(){
// 		$('#policeTime').html(timeDown);
// 		timeDown--;
// 	}, 1000);
	
// 	window.setTimeout(function(){
// 		$('#policeMode').modal('hide');
// 		window.clearInterval(forTime);
// 		var timeDown = 14;
// 	}, (timeDown + 1) * 1000);
// }

// function police(){
// 	isPolice = true;
// 	$.ajax({
// 			url: 'http://localhost:8080/game/police',
// 			type: 'get',
// 			data: {
// 				'roomId': room.id,
// 				'location': locate
// 			},
// 			async: true,
// 			success: function(data, status){
// 				if (data.code == 1){
// 					$('#policeMode').modal('hide');
// 				}else{
// 					alert(data.message);
// 				}
// 			}
// 		});
// }

// function closePoliceMode(){
// 	$('#policeMode').modal('hide');
// }

// function showPoliceVote(){
// 	chooseMode('请选择一名玩家作为警长', 15, '请投票');
// 	var timeDown = 14;
// 	var forTime = window.setInterval(function(){
// 		$('#chooseTime').html(timeDown);
// 		timeDown--;
// 	}, 1000);
	
// 	window.setTimeout(function(){
// 		closeWolf();
// 		window.clearInterval(forTime);
// 		var timeDown = 14;
// 	}, (timeDown + 1) * 1000);
// }

function showDead(who){
	var imgId = "#player" + who + "_img";
	var deadMan = "<span style='display: inline-block; margin-top: 10px; margin-left: 110px; color: white; font-size:20px;'>死亡</span>"
	$(imgId).html(deadMan);
}

$(function(){
	$('.button_list .btn').click(chooseOne);
});

function chooseMode(title, time, message) {
	$('#chooseTitle').html(title);
	$('#chooseTime').html(time);
	$('#appendMessage').html(message);
	$('#locate_13').addClass('disabled');
	$('#locate_14').addClass('disabled');
	$('#locate_15').addClass('disabled');
	$('#locate_16').addClass('disabled');
	$('#chooseMode').modal({backdrop: 'static', keyboard: false});
	$('#chooseMode').modal('show');
}

function wolf(){
	chooseMode('请选择杀死一名玩家', 60, '请杀人');
	var timeDown = 59;
	var forTime = window.setInterval(function(){
		$('#chooseTime').html(timeDown);
		timeDown--;
	}, 1000);
	
	window.setTimeout(function(){
		closeWolf();
		window.clearInterval(forTime);
		var timeDown = 59;
	}, (timeDown + 1) * 1000);
}

function closeWolf(){
	$('#chooseMode').modal('hide');
}

function prophet(){
	chooseMode('请选择一名玩家，验证其身份', 20, '请验人');
	var timeDown = 19;
	var forTime = window.setInterval(function(){
		$('#chooseTime').html(timeDown);
		timeDown--;
	}, 1000);
	
	window.setTimeout(function(){
		$('#chooseMode').modal('hide');
		window.clearInterval(forTime);
		var timeDown = 19;
	}, (timeDown + 1) * 1000);
}

function witch(){
	if (isSave && isPoison){
		$.ajax({
			url: 'http://localhost:8080/game/done',
			type: 'get',
			data: {
				'roomId': room.id
			},
			async: true,
			success: function(data, status){
				if (data.code == 1){
					powerDone(user.id, room.id);
				}else{
					alert(data.message);
				}
			}
		});
	}else if(isSave & !isPoison){
		$('#poisonMode').modal({backdrop: 'static', keyboard: false});
		$('#witchPoisonTime').html(15);
		$('#poisonMode').modal('show');
		var timeDown = 14;
		var forTime = window.setInterval(function(){
			$('#witchPoisonTime').html(timeDown);
			timeDown--;
		}, 1000);
		
		window.setTimeout(function(){
			$('#poisonMode').modal('hide');
			window.clearInterval(forTime);
			var timeDown = 14;
		}, (timeDown + 1) * 1000);
	}else{
		$('#witchMode').modal({backdrop: 'static', keyboard: false});
		$('#witchSaveTime').html(15);
		$('#witchMode').modal('show');
		var timeDown = 14;
		var forTime = window.setInterval(function(){
			$('#witchSaveTime').html(timeDown);
			timeDown--;
		}, 1000);
		
		window.setTimeout(function(){
			$('#witchMode').modal('hide');
			window.clearInterval(forTime);
			var timeDown = 14;
		}, (timeDown + 1) * 1000);
	}
}

function closeWitch(){
	$('#witchMode').modal('hide');
}

function closePoisonMode(){
	$.ajax({
			url: 'http://localhost:8080/game/done',
			type: 'get',
			data: {
				'roomId': room.id
			},
			async: true,
			success: function(data, status){
				if (data.code == 1){
					powerDone(user.id, room.id);
				}else{
					alert(data.message);
				}
			}
		});
	$('#poisonMode').modal('hide');
}

function poisonMode(){
	closeWitch();
	if(!isPoison){
		$('#poisonMode').modal('show');
	}else{
		$.ajax({
				url: 'http://localhost:8080/game/done',
				type: 'get',
				data: {
					'roomId': room.id
				},
				async: true,
				success: function(data, status){
					if (data.code == 1){
						powerDone(user.id, room.id);
					}else{
						alert(data.message);
					}
				}
			});
	}
}

function save(){
	isSave = true;
	closeWitch();
	$.ajax({
		url: 'http://localhost:8080/game/witch/save',
		type: 'get',
		data: {
			'roomId': room.id,
			'locate': beKillPlayer
		},
		async: true,
		success: function(data, status){
			if (data.code == 1){
				$('#dead').html('');
				powerDone(user.id, room.id);
				console.log('你成功救了' + beKillPlayer + '号');
			}else{
				alert(data.message);
			}
		}
	});
}

function witchPoison(){
	$('#poisonMode').modal('hide');
	chooseMode('请选择一名玩家，将其毒死', 15, '请毒人');
	var timeDown = 14;
	var forTime = window.setInterval(function(){
		$('#chooseTime').html(timeDown);
		timeDown--;
	}, 1000);
	
	window.setTimeout(function(){
		$('#chooseMode').modal('hide');
		window.clearInterval(forTime);
		var timeDown = 14;
	}, (timeDown + 1) * 1000);
}

function hunter(){
	chooseMode('请选择一名玩家，将其枪杀', 15, '请杀人');
	var timeDown = 14;
	var forTime = window.setInterval(function(){
		$('#chooseTime').html(timeDown);
		timeDown--;
	}, 1000);
	
	window.setTimeout(function(){
		$('#chooseMode').modal('hide');
		window.clearInterval(forTime);
		var timeDown = 14;
	}, (timeDown + 1) * 1000);
}

function vote(){
	isVote = true;
	chooseMode('请选择一名玩家，将其投票出局', 15, '请投票');
	var timeDown = 14;
	var forTime = window.setInterval(function(){
		$('#chooseTime').html(timeDown);
		timeDown--;
	}, 1000);
	
	window.setTimeout(function(){
		$('#chooseMode').modal('hide');
		window.clearInterval(forTime);
		var timeDown = 14;
		isVote = false;
	}, (timeDown + 1) * 1000);
}

var chooseOne = function chooseOne(){
	if (isVote) {
		isVote = false;
		var who = $(this).html();
		$.ajax({
			url: 'http://localhost:8080/game/vote',
			type: 'get',
			data: {
				'roomId': room.id,
				'locate': who
			},
			async: true,
			success: function(data, status){
				if (data.code == 1){
					console.log('你投了' + who + '号');
					$('#chooseMode').modal('hide');
				}else{
					alert(data.message);
				}
			}
		});
	}else if (role == '预言家'){
		$('#chooseMode').modal('hide');
		var who = $(this).html();
		$.ajax({
			url: 'http://localhost:8080/game/prophet',
			type: 'get',
			data: {
				'roomId': room.id,
				'locate': who
			},
			async: true,
			success: function(data, status){
				if (data.code == 1){
					isValidate = true;
					powerDone(user.id, room.id);
					showRole(who + "号的身份是：", data.data);
				}else{
					alert(data.message);
				}
			}
		});
	}else if (role == '女巫') {
		if (!isPoison){
			$('#chooseMode').modal('hide');
			var who = $(this).html();
			$.ajax({
				url: 'http://localhost:8080/game/witch/poison',
				type: 'get',
				data: {
					'roomId': room.id,
					'locate': who
				},
				async: true,
				success: function(data, status){
					if (data.code == 1){
						isPoison = true;
						powerDone(user.id, room.id);
						$('#chooseMode').modal('hide');
					}else{
						alert(data.message);
					}
				}
			});
		}
	}else if (role == '猎人') {
		$('#chooseMode').modal('hide');
	}else if (role == '狼人') {
		var who = $(this).html();
		$.ajax({
			url: 'http://localhost:8080/game/wolf',
			type: 'get',
			data: {
				'roomId': room.id,
				'locate': who
			},
			async: true,
			success: function(data, status){
				if (data.code == 1){
					$('#appendMessage').html('你想杀' + who + '号');
					kill(locate, room.id, who);
				}else if(data.code == 2){
					killDone(locate, room.id, who);
					closeWolf();
					showNight();
				}else{
					alert(data.message);
				}
			}
		});
	}else {
		$('#appendMessage').html('你是什么东西？');
	}
}