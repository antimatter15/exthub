function getForks(repo){
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'https://api.github.com/repos/'+repo+'/forks?sort=watchers', true);
	xhr.onload = function(){
		var json = JSON.parse(xhr.responseText);
		console.log(json)
	}
	xhr.send();
}


function getTags(repo){
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'https://api.github.com/repos/'+repo+'/tags', true);
	xhr.onload = function(){
		var json = JSON.parse(xhr.responseText);
		console.log(json)
	}
	xhr.send();
}

function downloadZipball(repo, tag){
	var xhr = new XMLHttpRequest();
	xhr.open('get', "https://nodeload.github.com/"+repo+"/zipball/"+tag, true)
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(){
		console.log("got response")
		unzipZipball(xhr.response);
	}
	xhr.onprogress = function(e){
		console.log(xhr, e)
	}
	xhr.send();
}


function unzipZipball(ab){

	var unzipper = new bitjs.archive.Unzipper(ab, 'loader/');
	/*unzipper.addEventListener("progress", function(e){
		console.log(e);
	});*/
	unzipper.addEventListener("finish", function(e){
		console.log(e)
	});
	unzipper.addEventListener("extract", function(e){
		console.log(e)
	});
	unzipper.start();
}