function translate(){
    if(document.getElementById('tab-btn-1').checked) {
        //text input radio button is checked
        let info = document.getElementById('text-input').value;
        document.getElementById('output').value = info;
      }else if(document.getElementById('tab-btn-2').checked) {
        //draw input radio button is checked
        let info = document.getElementById('drawkanji-canvas').value;
        document.getElementById('output').value = 'перевод нарисованного иероглифа';
      }
}
window.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    let b = document.getElementById('btnTranslate');
    const url = "http://127.0.0.1:8000/words_rus/";
    const url2 = "http://127.0.0.1:8000/words/";
    const result = document.getElementById("output");
    const str = this.document.getElementsByClassName("kanji_info2");
    const inp = document.getElementById("text-input");
    b.addEventListener("click", () => {
        let inpWord = document.getElementById("text-input").value;
        fetch(`${url2}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.pinyin){
                    result.value = result.value + `\n\n${data.english}`;
                    inp.value = `${inpWord} [${data.traditional}]\n/${data.pinyin}/`;
                }
                else result.value = `Такого слова нет`;
            })
            .catch(() => {
                result.value = `Ошибка`;
            }); 
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.pinyin){
                    result.value = `${data.russian}`;
                }
                else result.value = `Такого слова нет`;
            })
            .catch(() => {
                result.value = `Ошибка`;
            });         
        fetch(`http://bishun.strokeorder.info/mandarin.php?q=${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                strinnerHTML = ``;
                str.innerHTML =`<img src="http://bishun.strokeorder.info/characters/428918.gif" alt="str" height="100" width="100">`;
            })
            .catch(() => {
                str.value = `Ошибка`;
            }); 
    });
});

