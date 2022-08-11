import { defineStore } from 'pinia'

export const useLoginStore = defineStore({
    id: 'loginStatus',
    state: () => ({
        userID: ''
    }),
    getters: {
        isLogged() {
            return userID.length == null ? false : true;
        }
    },
})