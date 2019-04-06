class User{
    constructor (){
        this.users= [];
    }
    //@create user
    create(data){
        this.users.push(data);
        return data;
    }
    find(data){
        const user=this.users.find(user=>user.email===data);
        return user;
    }
}

export default new User();