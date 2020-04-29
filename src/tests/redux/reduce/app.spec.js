import {OPEN_DRAWER} from "../../../store/types";
import {appReducer, initialState} from "../../../store/reducers/app";

describe('drawer reducer', () => {
        it(OPEN_DRAWER, ()=> {
            const action = {
                type: OPEN_DRAWER,
                payload: true
            }

            expect(appReducer(initialState, action)).toEqual({
                ...initialState,
                openDrawer: action.payload
            })
        })
    }
)