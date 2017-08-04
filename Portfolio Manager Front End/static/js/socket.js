const SERVER_POINT = 'http://localhost:8080/wk';
const EMPTY_HEADER = {};

var stompClient = null;

function connect() {
    var socket = new SockJS(SERVER_POINT);
    stompClient = Stomp.over(socket);
    stompClient.connect(EMPTY_HEADER, connectCallback, errorCallback);
}

var connectCallback = function(frame) {
    console.log('socket connect success!');
    stompClient.subscribe('/topic/joinOrLeave', joinOrLeave);
    stompClient.subscribe('/topic/chatRoom', chatOnMessage);
    stompClient.subscribe('/topic/ready', readyOnMessage);
    stompClient.subscribe('/topic/say', sayOnMessage);
    stompClient.subscribe('/topic/role', roleOnMessage);
    stompClient.subscribe('/topic/game', gameOnMessage);
};

var errorCallback = function(error) {
    console.log('socket connect fail!');
};
//****************************************************************
function sendJoinOrLeave(destination){
    stompClient.send("/joinOrLeave", {}, JSON.stringify({
     'type': 1,
     'source': user.id,
     'destination': destination,
     'data': "",
     'message': ""
    }));
}

var joinOrLeave = function(response){
    var users = JSON.parse(response.body).destination;
    users.forEach(function(item, index) {
        if (item == user.id) {
        	getRoom();
            getPlayers();
        }
    });
};
//****************************************************************
function sendChat(roomId){
	var chatInfo = $('.chat-info').val();
    stompClient.send("/chatRoom", {}, JSON.stringify({
        'source': user.id,
        'destination': roomId,
        'type': 2,
        'data': chatInfo,
        'message': ""
       }));
}

var chatOnMessage = function(response){
    var users = JSON.parse(response.body).destination;
    var source = JSON.parse(response.body).source;
    var data = JSON.parse(response.body).data;
    users.forEach(function(item, index) {
        if (user.id == item && user.id != source) {
            getPlayers();
        	chat("leftBubble",source.portrait,data);
        }
    });
};
//****************************************************************
function sendReadyMessage(roomId, locate, message) {
    console.log('send ready message');
    stompClient.send("/ready", {}, JSON.stringify({
     'type': 1,
     'source': user.id,
     'destination': roomId,
     'data': locate,
     'message': message
    }));
};

var readyOnMessage = function(response){
    var type = JSON.parse(response.body).type;
    var users = JSON.parse(response.body).destination;
    var source = JSON.parse(response.body).source;
    var data = JSON.parse(response.body).data;
    var message = JSON.parse(response.body).message;
    users.forEach(function(item, index) {
        if (user.id == item && user.id != source) {
            if (type == '2'){
                //do something
            }else{
                var locate = parseInt(data);
                if (message == "ready"){
                    setReady(locate);
                }else{
                    setUnReady(locate);
                } 
            }
        }
    });
};
//****************************************************************
function sendSay(roomId, locate){
    stompClient.send("/say", {}, JSON.stringify({
        'source': user.id,
        'destination': roomId,
        'type': 1,
        'data': locate,
        'message': ""
       }));
}

var sayOnMessage = function(response){
    var users = JSON.parse(response.body).destination;
    var source = JSON.parse(response.body).source;
    var data = JSON.parse(response.body).data;
    users.forEach(function(item, index) {
        if (user.id == item && user.id != source) {
        	var locate = parseInt(data)
        	sayAction(locate);
        }
    });
};
//****************************************************************
var roleOnMessage = function(response){
    console.log('allocateRole roleOnMessage');
    var users = JSON.parse(response.body).destination;
    var data = JSON.parse(response.body).data;
    users.forEach(function(item, index) {
        if (item == user.id) {
        	allocateRole(data[index]);
        }
    });
};
//****************************************************************
function sendVideo(roomId, socketId){
    stompClient.send("/video", {}, JSON.stringify({
        'source': user.id,
        'destination': roomId,
        'type': 1,
        'data': socketId,
        'message': ""
       }));
}

var videoOnMessage = function(response){
    var users = JSON.parse(response.body).destination;
    var source = JSON.parse(response.body).source;
    var data = JSON.parse(response.body).data;
    users.forEach(function(item, index) {
        if (user.id == item && user.id != source) {
            var locate = parseInt(data)
            sayAction(locate);
        }
    });
};
//****************************************************************
function kill(source, roomId, who){
    stompClient.send("/game", {}, JSON.stringify({
        'type': 2,
        'source': source,
        'destination': roomId,
        'data': who,
        'message': "I want to kill it"
       }));
}

function killDone(source, roomId, who){
    stompClient.send("/game", {}, JSON.stringify({
        'type': 3,
        'source': source,
        'destination': roomId,
        'data': who,
        'message': "刀人完成"
       }));
}

function powerDone(source, roomId){
    stompClient.send("/game", {}, JSON.stringify({
        'type': 4,
        'source': source,
        'destination': roomId,
        'data': "",
        'message': "能力执行完成"
       }));
}

function firstSay(source, roomId){
    stompClient.send("/game", {}, JSON.stringify({
        'type': 4,
        'source': source,
        'destination': roomId,
        'data': "",
        'message': "能力执行完成"
       }));
}

function sayConfirm(roomId, location){
    stompClient.send("/game", {}, JSON.stringify({
        'type': 5,
        'source': user.id,
        'destination': roomId,
        'data': location,
        'message': "确认当前玩家是否能发言"
       }));
}

var gameOnMessage = function(response){
    var type = JSON.parse(response.body).type;
    var users = JSON.parse(response.body).destination;
    var source = JSON.parse(response.body).source;
    var data = JSON.parse(response.body).data;
    var message = JSON.parse(response.body).message;

    users.forEach(function(item, index) {
        if (user.id == item) {
            if (type == '1'){//开始游戏
                console.log('game start.');
                gameStart();
            }else if(type == '2'){//狼人完成指刀
                if(locate != source && role == '狼人'){
                    $('#appendMessage').html(source + '号想杀' + data + '号');
                    console.log('someone be killed.');
                }
            }else if(type == '3'){//狼人完成刀人
                beKillPlayer = data;
                $('#dead').html(beKillPlayer);
                if(user.id != source && role == '狼人'){
                    closeWolf();
                    showNight();
                    console.log(data + ' be killed.');
                }else if(role == '女巫'){
                    hideNight();
                    witch();
                }
            }else if(type == '4'){ //所有夜间能力者执行完能力
                data.forEach(function(deadMan, who){
                    showDead(deadMan);
                });
                hideNight();
                showDay();
            }else if(type == '5'){ //确认白天发言
                if (locate == data){
                    if (message == '遗言'){
                        say(1);
                    }else if(!isDead){
                        say();
                    }else{
                        sayConfirm(room.id, locate + 1);
                    }
                }
            }else if(type == '6'){ //白天投票
                if (!isDead){
                    vote();
                }
            }else if(type == '7'){ //进入黑夜
                if (!isDead){
                    intoNight();
                }
            }else if(type == '8'){ //进入黑夜
                if (locate == data){
                    isDead = true;
                }
            }else if(type == '9'){ //进入黑夜
                if (locate == data){
                    isDead = false;
                }
            }else{
                console.log('what happen?');
            }
        }
    });
}
//****************************************************************
//
//
//
var leaveRoom = function() {
    $.ajax({
        url: 'http://localhost:8080/rooms/1010/leave',
        type: 'get',
        data: {
            "userId": user.id
        },
        async: false,
        success: function(data, status){
            if (data.code == 1){
                console.log('user leave.');
                sendJoinOrLeave(1010);
            }else{
                console.log('user leave fail.');
                console(data.message);
            }
        }
    });
    unreadyAction();
};