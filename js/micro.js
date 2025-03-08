window.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    const microphoneButton = document.getElementById("microphone");
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = true; 

    const textInput = document.getElementById("text-input"); 

    let isRecording = false; // флаг для отслеживания состояния записи

    microphoneButton.addEventListener("mousedown", () => {
        isRecording = true;
        recognition.start();
    });

    microphoneButton.addEventListener("mouseup", () => {
        isRecording = false;
        recognition.stop();
        textInput.value = textInput.value.trim(); // удаление лишних пробелов в конце
    });


    recognition.addEventListener('result', e => {
    if (isRecording) { // проверка на состояние записи
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
        textInput.value = transcript;
        console.log(transcript)
    }
    });

    recognition.addEventListener('end', () => {
    if (isRecording) { // проверка на состояние записи
        recognition.start();
    }
    });
}); 