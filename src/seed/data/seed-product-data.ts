interface SeedProduct {
    name: string;
    amount: number;
    price: number;
    description: string;
    image_url: string;

}


interface SeedData {
    products: SeedProduct[];
}



export const initialProductData: SeedData = {
    products: [

        {
           
            "name": "APPLE IMAC CORE I5 ",
            "amount": 1,
            "price": 449.95,
            "description": "MacOS 10.12 Sierra 21.5 pulgadas 2.7 GHz (ME086LL/A) todo en uno, memoria de 8 GB, unidad de estado sólido de 256 GB",
            "image_url": "https://www.muycomputer.com/wp-content/uploads/2012/12/imac.jpg"
        },
        {
           
            "name": "ROKU EXPRESS 4K",
            "amount": 500,
            "price": 29.95,
            "description": "Reproductor multimedia de transmisión HD/4K/HDR con transmisión inalámbrica suave y control remoto de voz Roku con controles de TV, incluye cable HDMI® de alta calidad",
            "image_url": "https://cigars.roku.com/v1/http%3A%2F%2Fimage.roku.com%2Fw%2Frapid%2Fimages%2Fpdp-carousel-items%2F8b6b050c-1439-485e-ba20-aeda09781747.png"
        },
        {
            
            "name": "NINTENDO SWITCH LITE - BLUE",
            "amount": 200,
            "price": 196.95,
            "description": "Reproductor multimedia de transmisión HD/4K/HDR con transmisión inalámbrica suave y control remoto de voz Roku con controles de TV, incluye cable HDMI® de alta calidad",
            "image_url": "https://m.media-amazon.com/images/I/61-PblYntsL.jpg"
        }
]
}