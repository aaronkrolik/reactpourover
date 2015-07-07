ajaxquestions = [{question: "question1", status: "incomplete", label:"unmarked"},
                {question: "question2", status: "incomplete", label:"unmarked"},
                {question: "question3", status: "incomplete", label:"unmarked"},
                {question: "question4", status: "incomplete", label:"unmarked"},
                {question: "question5", status: "incomplete", label:"unmarked"},
                {question: "question6", status: "incomplete", label:"unmarked"},
                {question: "question7", status: "complete", label:"unmarked"},
                {question: "question8", status: "complete", label:"unmarked"},
                {question: "question9", status: "complete", label:"unmarked"},
                {question: "question10", status: "complete", label:"unmarked"},
                {question: "question11", status: "incomplete", label:"unmarked"},
                {question: "question36", status: "incomplete", label:"unmarked"}];


var collection = new PourOver.Collection();

var status_filter = PourOver.makeExactFilter("status", ["incomplete","complete"]);

collection.addFilters([status_filter]);

StatusView = PourOver.View.extend({
    selectionFn: function(){
        var colleciton = this.collection
        var status_questions = collection.filters.status.current_query;
        return status_questions;
    },
    render: function(){
        console.log("render!");
        var items = this.getCurrentItems();
        console.log(items);
    }
})

status_view = new StatusView("default_view", collection);
collection.filters.status.query('incomplete');









