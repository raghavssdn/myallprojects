const questionOperations = {
    questions : [],
    add(question){
        this.questions.push(question)
        console.log('question array is ',this.questions)
    },

    search(id){
        return this.questions.find(questionObject=>questionObject.id==id)
    },

    toggleMark(id){
        this.search(id).toggle()
    },

    countMark(){
        return this.questions.filter(qobj=>qobj.isMarked).length;
    },

    delete(){
        return this.questions=this.questions.filter(qobj=>qobj.isMarked==false);
    },

    searchData(type,data){
        if(type == 'Id'){
            let searchedobj = this.questions.filter(questionobj=>questionobj.id==data)
            this.searchquestions = searchedobj;
            if(searchedobj==''){
                alert('Data Not Found')
                return this.questions
            }
            else{
                return this.searchquestions
            }
        }
        if(type=='Name'){
            let searchedobj = this.questions.filter(questionobj=>questionobj.name==data)
            this.searchquestions = searchedobj;
            if(searchedobj==''){
                alert('Data Not Found')
                return this.questions
            }
            else{
                return this.searchquestions
            }
        }
        if(type=='Score'){
            let searchedobj = this.questions.filter(questionobj=>questionobj.score==data)
            this.searchquestions = searchedobj;
            if(searchedobj==''){
                alert('Data Not Found')
                return this.questions
            }
            else{
                return this.searchquestions
            }
        }
    },

    searchForUpdate(id){
        return this.questions.find(questionObject=>questionObject.id==id)
    },

    FindIndexForUpdate(id){
        return this.questions.findIndex(questionObject=>questionObject.id==id)
    },

    update(i,obj){
        this.questions.splice(i,1,obj);
        return this.questions;
    }
}
