/*function translate() {
    if (document.getElementById('tab-btn-1').checked) {
        // Text input radio button is checked
        let info = document.getElementById('text-input').value;
        document.getElementById('output').value = info;
    } else if (document.getElementById('tab-btn-2').checked) {
        // Draw input radio button is checked
        document.getElementById('output').value = 'перевод нарисованного иероглифа';
    }
}*/

window.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    const result = document.getElementById("output");
    const inp = document.getElementById("text-input");

    async function generateSpeechForChinese() {
        const text = inp.value.trim();
        const requestData = {
            //text: "哈喽, 你最近怎么样?",  //Текст для генерации речи
            //text: "I love pompompoms", // Текст для генерации речи
            text: text, 
            voice_id: 20299, 
            language: 2,  
            gender: 2,    
            age: 0       
        };
        // Проверяем, что текст не пустой
        if (!text) {
            alert('Пожалуйста, введите текст для генерации речи.');
            return;
        }

        try {
            var isPlaying = false;

            // Отправляем POST запрос на сервер для генерации речи
            const response = await fetch('https://api.translate.shoky.ru/tts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Ошибка при генерации речи');
            }

            const data = await response.json();
            const taskId = data.task_id;

            // Теперь получаем аудиофайл
            const audioResponse = await fetch(`https://api.translate.shoky.ru/tts/play/${taskId}`);
            if (!audioResponse.ok) {
                throw new Error('Ошибка при получении аудиофайла');
            }

            const audioBlob = await audioResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Обновляем источник аудио и воспроизводим
            const audioElement = document.getElementById('audio1');
            const audioSource = document.getElementById('audio-source1');
            audioSource.src = audioUrl;
            
            audioElement.load(); // Перезагружаем аудиоплеер            
            audioElement.play();  
        } catch (error) {
            console.error('Произошла ошибка:', error);
            alert('Произошла ошибка при обработке запроса.'); // Уведомление об ошибке
        }
    }
    async function generateSpeechForRussian() {
        const text = result.value.trim();
        const requestData = {
            text: text, 
            voice_id: 20299,  
            language: 1,  
            gender: 2,    
            age: 0        
        };
        // Проверяем, что текст не пустой
        if (!text) {
            alert('Пожалуйста, введите текст для генерации речи.');
            return;
        }

        try {
            // Отправляем POST запрос на сервер для генерации речи
            const response = await fetch('https://api.translate.shoky.ru/tts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Ошибка при генерации речи');
            }

            const data = await response.json();
            const taskId = data.task_id;

            // Теперь получаем аудиофайл
            const audioResponse = await fetch(`https://api.translate.shoky.ru/tts/play/${taskId}`);
            if (!audioResponse.ok) {
                throw new Error('Ошибка при получении аудиофайла');
            }

            const audioBlob = await audioResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Обновляем источник аудио и воспроизводим
            const audioElement = document.getElementById('audio2');
            const audioSource = document.getElementById('audio-source2');
            audioSource.src = audioUrl;
            audioElement.load(); // Перезагружаем аудиоплеер
            audioElement.play(); // Автоматически воспроизводим аудио
        } catch (error) {
            console.error('Произошла ошибка:', error);
            alert('Произошла ошибка при обработке запроса.'); // Уведомление об ошибке
        }
    }
    /*const audio1 = document.getElementById('audio1');
    function toggleAudio1() {
        if (audio1.paused) {
            audio1.play();
        } else {
            audio1.pause();
        }
    }
    const audio2 = document.getElementById('audio2');
    function toggleAudio2() {
        if (audio2.paused) {
            audio2.play();
        } else {
            audio2.pause();
        }
    }
    const playButton1 = document.getElementById('play-button1');
    playButton1.addEventListener("click", toggleAudio1);
    const playButton2 = document.getElementById('play-button2');
    playButton2.addEventListener("click", toggleAudio2);
    */
    const generateButtonZh = document.getElementById('play-button1');
    generateButtonZh.addEventListener('click', generateSpeechForChinese);
    
    const generateButtonRU = document.getElementById('play-button2');
    generateButtonRU.addEventListener('click', generateSpeechForRussian);
    
    let b = document.getElementById('btnTranslate');
    const url = "https://api.translate.shoky.ru/words_rus/";
    const url2 = "https://api.translate.shoky.ru/words/";
    const addInf = document.getElementById("additional-info");

    b.addEventListener("click", () => {
        const img = document.getElementById("img_str"); 
        let inputText = inp.value.trim();
        addInf.textContent = '';

        // Check if the word exists
        fetch(`https://api.translate.shoky.ru/words/${encodeURIComponent(inputText)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.pinyin) {
                    img.src = "https://api.translate.shoky.ru/stroke-order?q=" + `${inputText[0]}`; // Use the first character for the image

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
                                result.value += `${data.russian}`;
                            } else {
                                result.value = `Такого слова "${inputText}" нет\n`;
                            }
                        })
                        .catch(() => {
                            result.value = `Ошибка при обработке слова "${inputText}"\n`;
                        });
                } else {
                    // If the word doesn't exist, treat it as a phrase and translate it
                    if (!/^[A-Za-z]+$/.test(inputText)) {
                        img.src = "https://api.translate.shoky.ru/stroke-order?q=" + `${inputText[0]}`; // Use the first character for the image
                    }

                    // Fetch translation
                    fetch(`https://api.translate.shoky.ru/translate/?text=${encodeURIComponent(inputText)}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.translated_text) {
                                console.log('2')
                                //document.getElementById('audio-player2').style.visibility = 'visible';
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
