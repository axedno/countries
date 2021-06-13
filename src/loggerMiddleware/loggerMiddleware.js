


export const loggerMiddleware = store => next => action => {
    if(action.type === "contacts/countries"){
        localStorage.setItem('countries', JSON.stringify(action.payload));
    }
    return next(action);
}