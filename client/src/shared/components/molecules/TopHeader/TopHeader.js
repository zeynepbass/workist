import { useMemo, useState } from "react";
import { useAds } from "../hooks/useAds";

export function TopHeader () {
    const { data: posts = [] } = useAds();

    const [sortType, setSortType] = useState("all");

    const sortedPosts = useMemo(() => {
        const sorted = [...posts];

        if (sortType === "oldToNew") {
            sorted.sort(
                (a, b) =>
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
            );
        }

        if (sortType === "newToOld") {
            sorted.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );
        }

        return sorted;
    }, [posts, sortType]);

    const handleChange = (e) => {
        setSortType(e.target.value);
    };

    return (
        <>
            <h1 className="text-left text-gray-500 text-xl pl-4">
                İş <strong>İlanlarım</strong>
            </h1>



            <p className="text-gray-400 p-4">
                Tüm iş ilanlarını buradan takip edebilir,
                yönetebilir ve yeni iş ilanları
                oluşturabilirsin.
            </p>


        </>
    );
};

