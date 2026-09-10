import { Input } from "@/shared/components/atoms";

export default function AdsPricingOptions ({
    kodFiyatlandirma,
    ekstraOzellikler,
    onCheckboxChange,
}) {
    const codeOptions = [
        {
            key: "logo",
            label: "Logo",
        },
        {
            key: "kaynakKod",
            label: "Kaynak Kod",
        },
        {
            key: "fonMuzigi",
            label: "Fon Müziği",
        },
    ];

    const extraOptions = [
        {
            key: "hizliTeslimat",
            label: "Süper Hızlı Teslimat",
        },
        {
            key: "fullHd",
            label: "Full HD (1080px)",
        },
    ];

    return (
        <>
            <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-500">
                    Kod Fiyatlandırma*
                </h3>

                <div className="flex flex-col space-y-3">
                    {codeOptions.map((item) => (
                               <div
                               key={item.key}
                               className="flex items-center space-x-2"
                           >
          
                        <Input
                        type="checkbox"
                        checked={kodFiyatlandirma[item.key]}
                        onChange={() =>
                            onCheckboxChange(
                                "kodFiyatlandirma",
                                item.key
                            )
                        }
                        
                        >            <span>{item.label}</span></Input>
                 
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-500">
                    Extra*
                </h3>

                <div className="flex flex-col space-y-3">
                    {extraOptions.map((item) => (
                                                <div
                                                key={item.key}
                                                className="flex items-center space-x-2"
                                            >
                           
                                         <Input
                                    type="checkbox"
                                    checked={ekstraOzellikler[item.key]}
                                    onChange={() =>
                                        onCheckboxChange(
                                            "ekstraOzellikler",
                                            item.key
                                        )
                                    }
                                         
                                         >            <span>{item.label}</span></Input>
                                  
                                         </div>
      
                    ))}
                </div>
            </div>
        </>
    );
};

