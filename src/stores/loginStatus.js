import { defineStore } from 'pinia'

export const useLoginStore = defineStore({
    id: 'login',
    state: () => ({
        userID: ''
    }),
    getters: {
        isLogged() {
            return userID.length == null ? false : true;
        },
    },
})