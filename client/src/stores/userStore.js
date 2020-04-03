import {action, computed, observable, decorate ,toJS} from 'mobx'
import axios from 'axios'

const USER_API_KEY = 'http://localhost:3003/api/users'
class UserStore {
     users = []

     getUsers = async ()=>{
        let res = await axios.get(USER_API_KEY)   
        let users = await res.data
        this.setUsers(users)
     }
     
     setUsers = (users)=>{
        this.users = users
     }

     get userCount() {
        return this.users.length
    }
}
decorate(UserStore,{
    users: observable,
    setUsers:action,
    userCount: computed

})
const store = new UserStore()
export default store

