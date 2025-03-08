var arrLang = {
    'ru': {
      'title': 'Китайско-русский словарь',
      'author': 'Автор Шоки',
      'print': 'Напечатать',
      'draw': 'Нарисовать',
      'found_kanji': 'Найденные иероглифы',
      'clear': 'Очистить',
      'undo': 'Убрать последнюю черту',
      'translate': 'Перевести',
      'translated': 'Перевод',
      'stroke_order': 'Порядок черт',
      'audio':'Ваш браузер не поддерживает элемент audio'
    },
    'zh': {
        'title': '汉俄词典',
        'author': '由瘦刻意',
        'print': '印刷一下',
        'draw': '画一下',
        'found_kanji': '发现的汉字',
        'clear': '清除一切',
        'undo': '除去最后行程',
        'translate': '翻译',
        'translated': '翻译的',
        'stroke_order': '笔顺',
        'audio':'您的浏览器不支持音频元素.'
    }
  }
  
    $(function() {
      $('.translate').click(function() {
        var lang = $(this).attr('id');
  
        $('.lang').each(function(index, item) {
          $(this).text(arrLang[lang][$(this).attr('key')]);
        });
      });
    });