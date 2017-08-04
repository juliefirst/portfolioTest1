var user;

function getUser(){

	var userId = $.session.get('userId');
	var url = 'http://localhost:8080/users/' + userId;

	if (!userId){
		$('#toLogin').click();
	}else{
		$.ajax({
			url: url,
			type: 'get',
			async: false,
			success: onsuccess
		});
	}
}

var onsuccess = function(data, status){
	if (data.code == 'SUCCESS'){
		user = data.data;
		$('#userName').html(data.data.name);
		console.log('user: ' + user);
	}else{
		alert(data.message);
	}
}