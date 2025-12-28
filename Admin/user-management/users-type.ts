export type UserType = {
    UserRole: 'Admin' | 'ESS',
    EmployeeName: string, 
    Status: 'Enabled' | 'Disabled', 
    Username: string, 
    Password: string, 
    ConfirmPassword: string
}