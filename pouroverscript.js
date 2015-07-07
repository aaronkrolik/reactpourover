ajaxitems = [{item: "item1", status: "incomplete", label:"unmarked"},
                {item: "item2", status: "incomplete", label:"unmarked"},
                {item: "item3", status: "incomplete", label:"unmarked"},
                {item: "item4", status: "incomplete", label:"unmarked"},
                {item: "item5", status: "incomplete", label:"unmarked"},
                {item: "item6", status: "incomplete", label:"unmarked"},
                {item: "item7", status: "complete", label:"unmarked"},
                {item: "item8", status: "complete", label:"unmarked"},
                {item: "item9", status: "complete", label:"unmarked"},
                {item: "item10", status: "complete", label:"unmarked"},
                {item: "item11", status: "incomplete", label:"unmarked"},
                {item: "item36", status: "incomplete", label:"unmarked"}];


var collection = new PourOver.Collection();

var status_filter = PourOver.makeExactFilter("status", ["incomplete","complete"]);

collection.addFilters([status_filter]);

StatusView = PourOver.View.extend({
    selectionFn: function(){
        var colleciton = this.collection
        var status_items = collection.filters.status.current_query;
        return status_items;
    },
    render: function(){
        console.log("render!");
        var items = this.getCurrentItems();
        console.log(items);
    }
})

status_view = new StatusView("default_view", collection);
collection.filters.status.query('incomplete');









