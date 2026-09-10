import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import { AdList } from "../components/AdList";
import { TopHeader } from "@/shared/components/molecules";
import { PostSort } from "@/shared/components/molecules";
import {StatusMessage} from "@/shared/components/molecules";

import { useAds } from "../hooks/useAds";

const Index = () => {
    const [sortType, setSortType] = useState("all");

    const {
        data:posts = [],
        userId,
        firstName,
        isLoading,
        isError,
        deleteAds,
        isDeleting,
    } = useAds();

    const navigate = useNavigate();

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

    const handleEditClick = (id) => {
        navigate(`/Ads/${id}`);
    };

    if (isLoading) {
        return (
            <StatusMessage
                type="loading"
                message="İlanlar yükleniyor..."
            />
        );
    }

    if (isError) {
        return (
            <StatusMessage
                type="error"
                message="İlanlar yüklenirken bir hata oluştu."
            />
        );
    }

    return (
        <div className="p-4 h-[100vh]">
            <TopHeader />

            <PostSort
                sortType={sortType}
                onChange={handleChange}
            />

            <Modal />

            <AdList
                posts={sortedPosts}
                userId={userId}
                firstName={firstName}
                onEdit={handleEditClick}
                onDelete={deleteAds}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default Index;