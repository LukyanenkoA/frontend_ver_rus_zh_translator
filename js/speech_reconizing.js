document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Проверка поддержки MediaRecorder
    if (typeof MediaRecorder === 'undefined') {
        console.error("Ваш браузер не поддерживает MediaRecorder.");
        return;
    }

    let socket;
    let mediaRecorder;
    let stream;
    const audioChunks = [];
    const microphoneButton = document.getElementById("microphone");
    const textInput = document.getElementById("text-input"); 

    let isRecording = false; // Флаг для отслеживания состояния записи

    microphoneButton.onclick = async () => {
        if (!isRecording) {
            // Если не записываем, начинаем запись
            socket = new WebSocket("ws://api.translate.shoky.ru/ws");

            socket.onopen = async () => {
                console.log("WebSocket соединение установлено.");
                await startRecording();
                microphoneButton.style.background = "";
                microphoneButton.style.background = "url('./stop-icon.png') no-repeat center center"; // Изменяем фон на иконку остановки
                microphoneButton.style.backgroundSize = "cover";
            };

            socket.onmessage = (event) => {
                const resultDiv = document.getElementById('result');
                console.log("Получено сообщение от сервера:", event.data);
                const recognizedText = event.data;
                textInput.value = `${recognizedText}`;
            };

            socket.onclose = (event) => {
                console.log("WebSocket соединение закрыто:", event);
            };

            socket.onerror = (error) => {
                console.error("WebSocket ошибка:", error);
            };

            isRecording = true; // Устанавливаем флаг записи
        } else {
            // Если уже записываем, останавливаем запись и отправляем данные
            stopRecording();
            console.log('fuck');
            microphoneButton.style.background = "";
            microphoneButton.style.background = "url('./microphone.png') no-repeat center center"; // Изменяем фон на иконку начала записи
            microphoneButton.style.backgroundSize = "cover";
            isRecording = false; // Сбрасываем флаг записи
        }
    };

    async function startRecording() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                    console.log("Данные доступны:", event.data.size); // Отладка
                }
            };

            mediaRecorder.onstop = async () => {
                console.log("Запись остановлена, размер массива:", audioChunks.length); // Отладка
                if (audioChunks.length > 0) {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    console.log("Создан Blob, размер:", audioBlob.size); // Отладка
                    await sendAudioData(audioBlob);
                    audioChunks.length = 0; // Очистить массив после отправки
                } else {
                    console.log("Не удалось записать аудио: массив пуст.");
                }
            };

            mediaRecorder.start();
            console.log("Запись начата...");
        } catch (error) {
            console.error("Ошибка при получении доступа к микрофону:", error);
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            console.log("Запись остановлена.");
        } else {
            console.log("Запись уже остановлена или не была начата.");
        }
    }

    async function sendAudioData(audioBlob) {
        const arrayBuffer = await audioBlob.arrayBuffer();

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(arrayBuffer);
            console.log("Аудиоданные отправлены на сервер.");
        } else {
            console.warn("WebSocket не открыт. Попытка переподключения...");
            socket = new WebSocket("ws://127.0.0.1:8000/ws");
            socket.onopen = () => {
                console.log("WebSocket переподключен.");
                socket.send(arrayBuffer); // Отправляем данные после успешного подключения
            };
        }
    }
});
