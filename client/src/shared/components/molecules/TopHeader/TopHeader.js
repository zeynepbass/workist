import { useMemo, useState } from "react";
import { useAds } from "@/features/ads/hooks/useAds";

export function TopHeader ({title,desc}) {


    return (
        <>
            <h1 className="text-left text-gray-500 text-xl pl-4">
           {title} 
            </h1>



            <p className="text-gray-400 p-4">
           {desc}     
            </p>


        </>
    );
};

