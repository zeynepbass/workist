import { useMemo, useState } from "react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import {StatusMessage} from "@/shared/components/molecules";

import BuyerHeader from "@/features/orders/components/BuyerHeader";
import BuyerRequestList from "@/features/orders/components/BuyerRequestList";
import Message from "@/features/messages/pages/Message";

export default function Request() {
    const [expandedItems, setExpandedItems] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);

    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?.result?._id;

    const {
        userPosts,
        posts,
        isUserPostsLoading,
        isPostsLoading,
        isUserPostsError,
        isPostsError,
    } = useOrders(userId);

    const filteredData = useMemo(() => {
        if (!posts || !userPosts) {
            return [];
        }

        const selectedCategories = userPosts.map(
            (item) => item.selectedCategory
        );

        return posts
            .filter(
                (item) =>
                    selectedCategories.includes(item.selectedCategory) &&
                    item.userId !== userId
            )
            .reverse();
    }, [posts, userPosts, userId]);

    const toggleText = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleMessage = (item) => {
        setSelectedUser({
            id: item.userId,
            adi: item.kullaniciAd,
        });

        setOpen(true);
    };

    const handleCloseMessage = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    if (isUserPostsLoading || isPostsLoading) {
        return (
            <StatusMessage
                type="info"
                message="Alıcı istekleri yükleniyor..."
            />
        );
    }

    if (isUserPostsError || isPostsError) {
        return (
            <StatusMessage
                type="error"
                message="Alıcı istekleri yüklenirken bir hata oluştu."
            />
        );
    }

    return (
        <div className="mx-auto p-4 rounded-lg h-[100vh] overflow-auto">

            <BuyerHeader />

            <BuyerRequestList
                items={filteredData}
                expandedItems={expandedItems}
                onToggleText={toggleText}
                onMessage={handleMessage}
            />

            {open && selectedUser && (
                <Message
                    open={open}
                    onClose={handleCloseMessage}
                    adi={selectedUser.adi}
                    gonderenId={userId}
                    aliciId={selectedUser.id}
                />
            )}

        </div>
    );
}