interface SeedUser {
    email: string;
    password: string;
    fullName: string;
    roles: string[];
}


interface SeedData {
    users: SeedUser[];
}



export const initialUserData: SeedData = {
    users: [
        {
            "email": "admin@admin.com",
            "password": "Abc18556",
            "fullName": "Administrator Inventory",
            "roles":   ['administrator']
        },
        {
            "email": "extern@admin.com",
            "password": "Abc18556",
            "fullName": "External Inventory",
            "roles": ['external']
        }
    ]
}