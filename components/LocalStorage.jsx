const localStorage = ({todos}) => {
    
    const Localinit = () => {
        if(window.localStorage.getItem("todos") !== null){
            const localString = window.localStorage.getItem("todos");
            const localData = JSON.parse(localString);
            return localData;
        } else {
            const localData = todos;
            const localString = JSON.stringify(localData);
            window.localStorage.setItem("todos", localString);
            return todos;
        }
    }

    const Localupdate = () => {
        const localData = todos;
        const localString = JSON.stringify(localData);
        window.localStorage.setItem("todos", localString);
    }

}

export default localStorage;
