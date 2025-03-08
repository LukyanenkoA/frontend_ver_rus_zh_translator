window.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    let mediaRecorder;
    let audioChunks = [];

    document.getElementById("start").addEventListener("click", function() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.ondataavailable = function(event) {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = function() {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    document.getElementById("audioPlayback").src = audioUrl;
                    audioChunks = []; // Очистка массива аудиофрагментов
                };

                document.getElementById("stop").disabled = false;
            })
            .catch(function(err) {
                console.error("Ошибка доступа к аудио:", err);
            });
    });

    document.getElementById("stop").addEventListener("click", function() {
        mediaRecorder.stop();
        this.disabled = true;
    });
});