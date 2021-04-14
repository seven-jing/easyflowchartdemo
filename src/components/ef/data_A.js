const dataA = {
    name: '流程A',
    nodeList: [
        {
            id: 'nodeA',
            name: '流程A',
            type: 'river',
            left: '26px',
            top: '161px',
            width: '120',
            height: '50',
            border: true,
            fontLeft: '0',
            fontTop: '0',
            bgcolor: '#fff',
            fontsize: '12',
            fontcolor: '#000',
            alignDirection: 'middle',
            direction: 'align',
            ico: require('../../assets/picture/river.png')
        },
        {
            id: 'nodeB',
            name: '流程B',
            type: 'reservoir',
            left: '340px',
            top: '161px',
            width: '120',
            height: '50',
            border: true,
            bgcolor: '#fff',
            fontsize: '12',
            fontcolor: '#000',
            fontLeft: '0',
            fontTop: '0',
            alignDirection: 'middle',
            direction: 'align',
            ico: require('../../assets/picture/reservoir.png')
        },
        {
            id: 'nodeC',
            name: '流程C',
            type: 'area',
            left: '739px',
            top: '161px',
            width: '120',
            height: '50',
            border: false,
            bgcolor: '#fff',
            fontsize: '12',
            fontcolor: '#000',
            fontLeft: '0',
            fontTop: '0',
            alignDirection: 'middle',
            direction: 'align',
            ico: require('../../assets/picture/area.png')
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB'
    }, {
        from: 'nodeB',
        to: 'nodeC'
    }]
}

export function getDataA () {
    return dataA
}
