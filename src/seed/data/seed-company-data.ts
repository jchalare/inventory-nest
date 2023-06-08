interface SeedCompany{
    name: string;
    itin: string;
    address: string;
    phone_number: string;    
}


interface SeedData {
    companies: SeedCompany[];
}



export const initialCompanyData: SeedData = {
    companies: [
        {
            "name": "AMAZON",
            "itin": "111-111-111-111",
            "address": "abc-def",
            "phone_number": "12345678"
         },
        {
            "name": "EBAY",
            "itin": "222-222-222-222",
            "address": "abc-def",
            "phone_number": "12345678"
        },
        {
            "name": "WALMART",
            "itin": "4444444-9",
            "address": "abc-def",
            "phone_number": "12345678"
        },
        {
            "name": "TARGET",
            "itin": "4444444-8",
            "address": "abc-def",
            "phone_number": "12345678"
        },
        {
            "name": "ETSY",
            "itin": "4444444-6",
            "address": "abc-def",
            "phone_number": "12345678"
        },
        {
            "name": "ALIEXPRESS",
            "itin": "4444444-5",
            "address": "abc-def",
            "phone_number": "12345678"
        }
    ]
}