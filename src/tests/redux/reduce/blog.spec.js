import {SET_DATA_BLOG} from "../../../store/types";
import {blogReducer, initialState} from "../../../store/reducers/blog";

describe('blog reducer', () => {
        it(SET_DATA_BLOG, ()=> {
            const action = {
                type: SET_DATA_BLOG,
                payload: {
                    About: '',
                    Avatar: '',
                    Background: '',
                    Description: {
                        name: '',
                        about: ''
                    },
                    Tiers: [],
                    Posts: [],
                    Tasks: [],
                    Subscriptions: [],
                }
            }

            expect(blogReducer(initialState, action)).toEqual({
                ...initialState,
                About: action.payload.About,
                Avatar: action.payload.Avatar,
                Background: action.payload.Background,
                Description: action.payload.Description,
                Tiers: action.payload.Tiers,
                Posts: action.payload.Posts,
                Tasks: action.payload.Tasks,
                Subscriptions: action.payload.Subscriptions,
            })
        })
    }
)