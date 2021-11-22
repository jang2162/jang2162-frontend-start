import {atom} from 'recoil';
const themeState = atom({
    key: 'themeAtom',
    default: 'DEFAULT'
})

export {
    themeState
};
