window.addEventListener('load',initEvents);

function initEvents(){
    updateCounts();
    bindEvents();
}

function bindEvents(){
    document.querySelector('#add').addEventListener('click',addQuestion);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#search').addEventListener('click',search);
    document.querySelector('#tab').addEventListener('click',searchOption);
    document.querySelector('#update').addEventListener('click',updateObject)
}

function addQuestion(){
    var questionObject = new Question();
    for(let key in questionObject) {
        if(key==='isMarked'){
            continue;
        }
        questionObject[key] = document.querySelector('#'+key).value;
        // console.log('Add is call',questionObject[key]);
    }
    questionOperations.add(questionObject);
    printQuestion(questionObject);
    updateCounts();
    clearAllEntry()
}

function printQuestion(questionObject) {
    var tbody = document.querySelector('#question');
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in questionObject){
        if(key==='isMarked'){
            continue;
        }
        let td = tr.insertCell(index);
        td.innerText = questionObject[key];
        index++;
    }
    let td = tr.insertCell(index);
    let id = questionObject.id;
    td.appendChild(createIcon('far fa-trash-alt',id,toggleMark))
    td.appendChild(createIcon('far fa-edit',id,edit));
}

function createIcon(name,id,fn){
    let i = document.createElement('i');
    i.className = name;
    i.setAttribute('qid',id);
    i.addEventListener('click',fn)
    return i;
}

function toggleMark(){
    // console.log('U click on ',this);
    let id = this.getAttribute('qid');
    // console.log('qid is ',id)
    questionOperations.toggleMark(id);
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-secondary')
    updateCounts();
}

function updateCounts(){
    document.querySelector('#total').innerText = questionOperations.questions.length;
    document.querySelector('#marked').innerText = questionOperations.countMark()
    document.querySelector('#unmarked').innerText = questionOperations.questions.length - questionOperations.countMark()
}

function deleteMarked(){
    let arr = questionOperations.delete();
    printTable(arr);
}

function printTable(arr){
    document.querySelector('#question').innerHTML = '';
    arr.forEach(printQuestion);
    updateCounts();
}

function search(){
    let div = document.querySelector('.dsp');
    div.classList.toggle('dsp1')
    printTable(questionOperations.questions)
    document.querySelector('#txt').value = '';
}

function searchOption(){
    let selectvalue = document.querySelector('#selectvalue').value;
    // console.log(selectvalue)
    let inputsearch = document.querySelector('#txt').value;
    let searchArr = questionOperations.searchData(selectvalue,inputsearch)
    printTable(searchArr);
    updateSearchCounts();
    // console.log('searched arr is ',searchArr)
}

function updateSearchCounts(){
    document.querySelector('#totalsearch').innerText = questionOperations.searchquestions.length;
}

function clearAllEntry(){
    document.querySelectorAll('.form-control').forEach(ele=>ele.value='');
}

function edit(){
    let id = this.getAttribute('qid');
    let searchquestion = questionOperations.searchForUpdate(id);
    console.log('searchquestion ',searchquestion);
    for(let key in searchquestion){
        if(key=='isMarked'){
            continue;
        }
        document.querySelector('#'+key).value = searchquestion[key] ;
    }
}

function updateObject(){
    let id = document.querySelector('#id').value;
    let searchObjectIndex = questionOperations.FindIndexForUpdate(id);
    console.log('searchObjectIndex ',searchObjectIndex);
    let questionObject = new Question();
    for(let key in questionObject) {
        if(key==='isMarked'){
            continue;
        }
        questionObject[key] = document.querySelector('#'+key).value;
    }
    let questionObj = questionOperations.update(searchObjectIndex,questionObject);
    console.log('questionObj ',questionObj);
    printTable(questionObj);
}