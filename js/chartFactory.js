var c3 = require('c3');

var _data = {
    
    skills:{
        bindto: '#skills',
        data:{
            xs: {
                '1 Begginer - 5 expert': 'x1'
            },
            columns: [
                ['x1', 1, 2, 3, 4, 5],
                ['1 Begginer - 5 expert', 30, 200, 100, 400, 150, 250]
            ],
            type: 'bar'
        }
    },
    last:{
        bindto: '#last',
        data:{
            columns: [
                ['<6 months', 10],
                ['6 months', 20],
                ['1 year', 50],
                ['2 years', 15], 
                ['> 2 years', 5]
            ],
            type: 'donut'
        }
    },
    os:{
        bindto: '#os',
        data:{
            columns: [
                ['Linux', 10],
                ['Windows', 20],
                ['Mac OS', 50]
            ],
            type: 'donut'
        }
    }
    
};

function _chart(el){
    var id = el.id;
    
    c3.generate(_data[id]);
}

function chartFactory(){}

chartFactory.slideChange = function(e){
    
    var el = e.currentSlide.querySelector('.chart');
    if(el !== null) _chart(el);
};

module.exports = chartFactory;