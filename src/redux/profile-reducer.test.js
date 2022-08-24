import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";


let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 13 }
    ],
};

it('length of posts should be incremented', () => {
    let action = addPostActionCreator("it-kamasutra.com");
    
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);

});