
const selectedFoodList = {};

const reducerFood = (state = selectedFoodList, action) => {
            if(action.type === 'notificationCount'){
                if(action.payload === true){
                    
                    state = false
                }
                else{
                    state = true
                }
            }
            return state
}


export { reducerFood }