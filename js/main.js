function translate() {
    if (document.getElementById('tab-btn-1').checked) {
        // Text input radio button is checked
        let info = document.getElementById('text-input').value;
        document.getElementById('output').value = info;
    } else if (document.getElementById('tab-btn-2').checked) {
        // Draw input radio button is checked
        document.getElementById('output').value = 'перевод нарисованного иероглифа';
    }
}

window.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    let b = document.getElementById('btnTranslate');
    const url = "http://127.0.0.1:8000/words_rus/";
    const url2 = "http://127.0.0.1:8000/words/";
    const result = document.getElementById("output");
    const inp = document.getElementById("text-input");
    const addInf = document.getElementById("additional-info");

    b.addEventListener("click", () => {
        const img = document.getElementById("img_str"); 
        let inputText = inp.value.trim();


        // Check if the word exists
        fetch(`http://127.0.0.1:8000/words/${encodeURIComponent(inputText)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.pinyin) {
                    img.src = "http://127.0.0.1:8000/stroke-order?q=" + `${inputText[0]}`; // Use the first character for the image

                    // Fetch word details
                    fetch(`${url2}${inputText}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.pinyin) {
                                console.log('1')
                                result.value = `${data.english}\n`;
                                addInf.textContent = `[${data.traditional}]  /${data.pinyin}/`;
                            } else {
                                result.value = `Такого слова "${inputText}" нет\n`;
                            }
                        })
                        .catch(() => {
                            result.value += `Ошибка при обработке слова "${inputText}"\n`;
                        });

                    // Fetch Russian translation
                    fetch(`${url}${inputText}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.russian) {
                                result.value += `${data.russian}\n`;
                            } else {
                                result.value = `Такого слова "${inputText}" нет\n`;
                            }
                        })
                        .catch(() => {
                            result.value = `Ошибка при обработке слова "${inputText}"\n`;
                        });
                } else {
                    // If the word doesn't exist, treat it as a phrase and translate it
                    img.src = "http://127.0.0.1:8000/stroke-order?q=" + `${inputText[0]}`; // Use the first character for the image

                    // Fetch translation
                    fetch(`http://127.0.0.1:8000/translate/?text=${encodeURIComponent(inputText)}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.translated_text) {
                                console.log('2')
                                result.value = `${data.translated_text}\n`;
                            } else {
                                result.value = `Не удалось перевести текст: "${inputText}"\n`;
                            }
                        })
                        .catch(() => {
                            result.value = `Ошибка при обработке текста "${inputText}"\n`;
                        });
                }
            })
            .catch(() => {
                result.value = `Ошибка при проверке текста "${inputText}"\n`;
            });
    });
});
