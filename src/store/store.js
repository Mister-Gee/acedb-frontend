import { createState } from '@hookstate/core';

const store = createState({
    role: '',
    userId: '',
    alertNotification: false,
    alertMessage: '',
    alertType: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    deptID: ''

})

export default store;