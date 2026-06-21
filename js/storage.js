const Storage = {

    save(key, value){
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    },

    load(key){
        const data = localStorage.getItem(key);

        if(!data){
            return null;
        }

        return JSON.parse(data);
    }

};
