
$(document).ready(function() {
	var requests = [];
	var results = $('.kanji_info');
	$(document).on('drawV1.done', function(event) {
		results.removeClass('active');
		results.addClass('loading');

		setTimeout(function() {
			recognize(points)
		}, 200);
	});
	function recognize(strokes) {
		abortRequests();
		if (strokes.length !== 0) {
			var a = 'a=recognize';
			var q = '&q=' + JSON.stringify(strokes);
			var token = '&YII_CSRF_TOKEN=' + zhonga.getToken();

			requests.push(
				$.ajax({
					url: 'https://www.zhonga.ru/hwr/',
					type: 'POST',
					data: a + q + context + token,
					success: showResults,
					error: showError
				})
			);
		}
		else {
			results.children('.kanji_info2').eq(0).empty();
		}
	}

	function showResults(data) {
		var kanji_info = JSON.parse(data);
		if(kanji_info.length !== 0) {
			results.removeClass('loading');
			results.children('.kanji_info2').eq(0).empty();

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

				results.children('.kanji_info2').eq(0).append(container);
			});
		}
		else {
			setTimeout(function() {
				recognize(points)
			}, 2000);
		}
	}

	function showError(xhr, status, error) {
		if(status != 'abort') {
			results.children('.kanji_info2').eq(0).append(error);
		}
	}

	function abortRequests() {
		for(i = 0; i < requests.length; i++) {
			requests[i].abort();
		}
	}

	results.children('.kanji_info2').on('click', function() {

		$.ajax({
			url: 'https://www.zhonga.org/hwr/train',
			type: 'POST',
			data: "q=" + $(this).text() + "\t" + JSON.stringify(points)
		});
	});


});
