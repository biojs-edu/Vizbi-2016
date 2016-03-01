var cytoscape = require('cytoscape');

var elesJson = {
  nodes: [
    { data: { id: 'Document', col:'steelblue' } },
    { data: { id: 'Root element: <html>', col:'steelblue' } },
    { data: { id: 'Element: <head>', col:'steelblue' } },
    { data: { id: 'Element: <body>', col:'steelblue' } },
    { data: { id: 'Element: <title>', col:'steelblue' } },
    { data: { id: 'Text: "My title"', col:'steelblue' } },
    { data: { id: 'Element: <a>', col:'steelblue' } },
    { data: { id: 'Element: <h1>', col:'steelblue' } },
    { data: { id: 'Attribute: href', col:'steelblue' } },
    { data: { id: 'Text: "My link"', col:'steelblue' } },
    { data: { id: 'Text: "My header"', col:'steelblue' } }
  ], 

  edges: [
    { data: { id: 'ae', source: 'Document', target: 'Root element: <html>', col:'steelblue' } },
    { data: { id: 'ab', source: 'Root element: <html>', target: 'Element: <head>', col:'steelblue' } },
    { data: { id: 'be', source: 'Root element: <html>', target: 'Element: <body>', col:'steelblue' } },
    { data: { id: 'bc', source: 'Element: <head>', target: 'Element: <title>', col:'steelblue' } },
    { data: { id: 'ce', source: 'Element: <title>', target: 'Text: "My title"', col:'steelblue' } },
    { data: { id: 'cd', source: 'Element: <body>', target: 'Element: <a>', col:'steelblue' } },
    { data: { id: 'de', source: 'Element: <body>', target: 'Element: <h1>', col:'steelblue' } },
    { data: { id: 'def', source: 'Element: <h1>', target: 'Text: "My header"', col:'steelblue' } },
    { data: { id: 'deg', source: 'Element: <a>', target: 'Attribute: href', col:'steelblue' } },
    { data: { id: 'deh', source: 'Element: <a>', target: 'Text: "My link"', col:'steelblue' } }
  ]
};

var target = document.getElementById('cy');
  
var cy = cytoscape({
    container: target,
    elements: elesJson,
    style : cytoscape.stylesheet()
        .selector('node').css({
            'background-color': 'data(col)',
            'width': '15',
            'height': '15',
            'content': 'data(id)',
            'shape':'circle',
            'text-wrap': 'wrap',
            'font-size': '15'
            //'text-valign': 'center'
          })
        .selector('edge').css({
            'line-color': 'data(col)',
            'target-arrow-color': 'data(col)',
            'width': 2,
            'target-arrow-shape': 'triangle',
            'opacity': 0.5
          })
        .selector(':selected')
        .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black',
            'opacity': 1
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),
  
    layout: {
        name: 'breadthfirst',
        directed: false,
        circle: false,
        roots: '#Document',
        spacingFactor: 0.5
    },
  
    ready: function(){
        
        //style fix
        target.firstChild.lastChild.style.position = "relative";
        console.log('graph is ready!');
    }
});

var code = document.getElementById('domcode');
var span = document.createElement('span');
span.innerHTML = '    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>My paragraph text<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><br>';
span.style.display = "none";
code.insertBefore(span, code.children[10]);



function addRemoveElement(){
    
   
    
    var elements = {
        nodes: [
            { data: { id:'Element: <p>', col:'red'} }, 
            { data: { id:'Text: "My paragraph text"', col:'red'} }
        ],
        edges: [
             { data: { id: '0', source: 'Element: <body>', target: 'Element: <p>', col:'red' } },
             { data: { id: '1', source: 'Element: <p>', target: 'Text: "My paragraph text"', col:'red' } }
        ]
    };
    
    var els = cy.elements().filter(function(i,e){
        return (e.data('col') === 'red'); 
    });
    
    if(!els.length){
        span.style.display = "";
        cy.add(elements);
    }else{
        span.style.display = "none";
        cy.remove(els);
    }

    cy.elements().layout({
        name: 'breadthfirst',
        directed: false,
        circle: false,
        roots: '#Document',
        spacingFactor: 0.5
    });
}

//On link click
var el = document.getElementById('addRemove');
el.onclick = function(){ addRemoveElement(); return false; };
