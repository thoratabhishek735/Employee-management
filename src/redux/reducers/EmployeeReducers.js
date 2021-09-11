const employeeReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            let index = state.findIndex(doc => doc.email === action.data.email || doc.phone === action.data.phone)
            if (index === -1) {
                
                return [...state, action.data]
            }

            return [...state]

        case 'DELETE_EMPLOYEE':
            return state.filter((employee) => employee.email !== action.data.email)

        case 'UPDATE_EMPLOYEE':
            return state.map((employee) => {
                if (employee.id === action.data.id) {
                    employee.email = action.data.email
                    employee.id = action.data.id
                    employee.phone = action.data.phone
                    employee.firstName = action.data.firstName
                    employee.lastName = action.data.lastName
                    employee.dob = action.data.dob
                    employee.leaves = action.data.leaves
                    return employee;
                }

                return employee;
            })

        case 'GET_EMPLOYEES':
            return state;
        
        default:
            return state
    }
}

export default employeeReducer;