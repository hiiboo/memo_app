// 要素を取得する
const addBtn = document.getElementById('add')

//ローカルストレージからデータを取得する
const notes = JSON.parse(localStorage.getItem('notes'))

//メモ帳追加処理を実行
if(notes){
    notes.forEach(note => addNewNote({
        text: note.text,
        timestamp: note.timestamp
    }));
};

// 作成ボタンのクリックイベントの登録
addBtn.addEventListener('click', () => addNewNote({ text: '', timestamp: Date.now() }));

function addNewNote({
    text = '',
    timestamp = Date.now()})
    {
    // div要素を作成
    const note = document.createElement('div')
    // noteクラスを追加
    note.classList.add('note')
 
    // メモ帳を追加
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    <div class="timestamp">${new Date(timestamp).toLocaleString()}</div>
    `;

    // 時刻を表示する要素を作成し、note要素に追加する
    const timestampDiv = document.createElement('div');
    timestampDiv.classList.add('timestamp');
    timestampDiv.textContent = new Date(timestamp).toLocaleString();
    note.appendChild(timestampDiv);

    //操作に必要な要素を取得
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    //テキストエリアにイン数で渡したテキストを代入
    //新規・編集があるのでこうしている
    textArea.textContent = text
    //markedはHTMLに追加したプラグイン
    main.innerHTML = marked(text)

    //削除のクリックイベントの登録
    deleteBtn.addEventListener('click', () => {
        deleteNote(note)
    })

    //編集ボタンのクリックイベントの登録
    editBtn.addEventListener('click', () => {
        editNote(main,textArea)
    })

    //テキストエリアのイベント
    textArea.addEventListener('input',(e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
        //ローカルストレージの更新
        updateLS()
    })

    // bodyの子要素として追加
    document.body.appendChild(note)
}

    // ローカルストレージにメモ帳を保存
    function updateLS() {
        
    //要素を取得
    const notesText = document.querySelectorAll('textarea')
    const notes = []

    //要素を格納
    notesText.forEach(note => notes.push(note.value))

    //notesという名前でローカルストレージを保存
    localStorage.setItem('notes',JSON.stringify(notes))}
    


    //メモ帳削除
    function deleteNote(note) {
        
    //ノートを削除
    note.remove()

    //ローカルストレージの更新
    updateLS()
    }

    //メモ帳編集
    function editNote(main,textArea){
        
    //hiddenがついているものは消し、ついてないものは付与する
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
    }
