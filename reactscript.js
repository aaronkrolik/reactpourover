/*** @jsx React.DOM */

    var liStyle = {
        width: '33.333%',
        float:'left',
        display:'inline',
    }

    var ulStyle = {
        width:'760px',
        overflow:'hidden',
    }

var TODOApp = React.createClass({

  /*
  so wtf is going on here? componentWillMount is called once, so its basically a constructor.
  I am passing a pourover view (this.props.po_view) to the instance. In this method, i register the 
  pourover callbacks so that they can talk to REACT and call REACT updates. this way we can create the 
  pourover collection, filters and views first, then wire it up with react. 

  collection.filters.status.query('inbox')
  */
  componentWillMount:function(){

    this.props.po_view.on("collection-change", _.bind(function(e){
        console.log("collection-change (inside react)");
        this.setState({itemdata:this.props.po_view.getCurrentItems()})
      }, this));

    this.props.po_view.on("update", _.bind(function(e){
        console.log("update (inside react)");
        this.setState({itemdata:this.props.po_view.getCurrentItems()})
      }, this));
  },

  getInitialState:function(){
    return { itemdata:[], status:'incomplete', newitem:''}
  },


  /*
    This method is called whenever the value is updated in the 'add new item' input box (whenever someone types in the box).
    This updateNewItem updates the React state via setState(). This update, not the act of typing in the box, is what makes 
    the new text visible. Try commenting out the inside of this method. You'll notice that typing doesnt change the text.
  */
  updateNewItem:function(e){
    this.setState({newitem:e.target.value});
  },

  /*
  addNewItem, which is triggered by clicking the 'add item' button, does two things. First, it adds a new item
  to our pourover collection. Adding a new item to pourover triggers a pourover 'collection-change' event. In this React
  component's 'componentWillMount' method, we specified that a pourover 'collection-change' event will update react state.
  After the item is added to pourover (and by extension, the relevant react state is updated), we clear the text box by setting
  the newitem state to ''. 
  */
  addNewItem:function(e){
    this.props.po_view.collection.addItems({item:this.state.newitem, status:'incomplete', label:"unmarked", project_id: "17"})
    this.state.newitem = '';
  },

  removeItem:function(cid, e){
  },

  toggleItemStatus:function(cid, e){
    this.props.po_view.collection.updateItem(cid, 'status', e.target.value);
  },

  /*
   onChangeFilter is updates the current pourover query and changes the state to reflect that query.
  */
  onChangeFilter:function(e){
    this.props.po_view.collection.filters.status.query(e.target.value);
    //update the internal state
    this.setState({status:e.target.value})
  },

  render:function(){
    return (
        <div>
          <h1> NYT Todo </h1>

          
          <ToggleButtons onChangeFilter={this.onChangeFilter} status={this.state.status} options={["incomplete","complete"]} />
          
          <input type="text" value={this.state.newitem} onChange={this.updateNewItem}/>
          <button onClick={this.addNewItem} disabled={this.state.newitem===''}>add item</button>
          
          <ItemList items={this.state.itemdata} toggleItemStatus={this.toggleItemStatus} />
        </div>
      )
  }
});

var ToggleButtons = React.createClass({
  render: function(){

    var toggleButtons = this.props.options.map(function(option){
      return <li><button onClick={this.props.onChangeFilter} value={option} disabled={option===this.props.status}>{option}</button></li>
    }.bind(this));

    console.log(this.props.onChangeFilter)
    return (
      <div>
      <h2>Viewing: {this.props.status}</h2>
      <ul>
        {toggleButtons}
      </ul>
      </div>
      )
  }
})

var ItemList = React.createClass({
  render:function(){
    var items = this.props.items.map(function(item){
      return <Item item={item} toggleItemStatus={this.props.toggleItemStatus} />
    }.bind(this));

    return (
      <ul style={ulStyle}>
        {items}
      </ul>
      )
  }
})

var Item = React.createClass({
  render: function(){
    return (
      <li style={liStyle}>
        <h2>{this.props.item["item"]}</h2>
        <select value={this.props.item["status"]}  onChange={this.props.toggleItemStatus.bind(this, this.props.item['cid'])}>
          <option>incomplete</option>
          <option>complete</option>
        </select>
      </li>
      )
  }
})

React.render(<TODOApp po_view={status_view}/>, document.getElementById('content'));

collection.addItems(ajaxitems);

