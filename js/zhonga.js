$(document).ready(function() {
	var requests = [];
	var results = $('kanji_info');

	function recognize(strokes) {
		abortRequests();
		if (strokes.length !== 0) {
			var a = 'a=recognize';
			var q = '&q=' + JSON.stringify(strokes);
			var token = '&YII_CSRF_TOKEN=' + zhonga.getToken();

			requests.push(
				$.ajax({
					url: 'https://www.zhonga.org/hwr/',
					type: 'POST',
					data: a + context + token,
					success: showResults,
					error: showError
				})
			);
		}
		else {
			results.removeClass('loading');
			results.children('.kanji_info').eq(0).empty();
		}
	}

	function showResults(data) {
		var kanji_info = JSON.parse(data);
		if(kanji_info.length !== 0) {
			results.children('.kanji_info').eq(0).empty();

			$.each(kanji_info, function(i, character) {
				var container = $('<div />', {
					'class': 'character'
				});
				var value = $('<div />', {
					'class': 'value',
					text: character.value
				});
				var pinyin = $('<span />', {
					'class': 'pinyin',
					text: character.pinyins
				});
				$(container).append(value);
				$(container).append(pinyin);

				results.children('.kanji_info').eq(0).append(container);
			});
		}
		else {
			setTimeout(function() {
				recognize(canvas.strokes)
			}, 2000);
		}
	}

	function showError(xhr, status, error) {
		if(status != 'abort') {
			results.children('.kanji_info').eq(0).append(error);
		}
	}

	function abortRequests() {
		for(i = 0; i < requests.length; i++) {
			requests[i].abort();
		}
	}

	results.children('.kanji_info').on('click', function() {

		$.ajax({
			url: 'https://www.zhonga.org/hwr/train',
			type: 'POST',
			data: "q=" + $(this).text() + "\t" + JSON.stringify(canvas.strokes)
		});
	});


});
