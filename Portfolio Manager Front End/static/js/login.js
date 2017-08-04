function loginAction(){
	var username = $('#username').val();
	var password = $('#password').val();
	$.ajax({
		url: "http://localhost:8080/login",
		type: "post",
		data: {"username": username, "password": password},
		async: true,
		success: onSuccess
	});
}

function onSuccess(data, status){
	if (data.code == 'SUCCESS') {
		$.session.set('userId', data.data.id);
		$("#route").click();
	}else {
		alert(data.message);
	}
}