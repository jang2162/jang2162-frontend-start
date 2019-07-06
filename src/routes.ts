import {infoToList} from 'route-info';


export default infoToList({
    index: {
        pattern: ['/', '/index']
    },
    test: {
        pattern: '/test/:id',
        layout: 'NewLayout',
        param: {aa: 22}
    }
});