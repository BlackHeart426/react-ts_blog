import {openDrawerActionCreator} from "../../../store/action/app";
import {OPEN_DRAWER} from "../../../store/types";


describe('drawer action', () => {
    const open = true

    const action = {
        type: OPEN_DRAWER,
        payload: open
    }

    it('openDrawerActionCreator', ()=> {
        expect(openDrawerActionCreator(open)).toEqual(action)
    })
})

