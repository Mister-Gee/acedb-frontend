import { createState } from '@hookstate/core';

const store = createState({
    role: '',
    alertNotification: false,
    alertMessage: '',
    alertType: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',

})

export default store;