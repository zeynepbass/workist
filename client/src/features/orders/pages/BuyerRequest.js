
import Ads from "@/features/ads/pages/AdsPage";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Message from "@/features/messages/pages/Message";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {StatusMessage} from "@/shared/components/molecules";
import BuyerRequestCard from "@/features/orders/components/BuyerRequestCard";
import BuyerHeader from "@/features/orders/components/BuyerHeader";

export default function BuyerRequest() {
    const [selectedAliciId, setSelectedAliciId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { user, userId } = useCurrentUser();

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

        return posts.filter(
            (item) =>
                selectedCategories.includes(item.selectedCategory) &&
                item.userId !== userId
        );
    }, [posts, userPosts, userId]);

    const toggleText = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleMessage = (item) => {
        setSelectedItem(item);
        setSelectedAliciId(item.userId);
        setOpen(true);
    };

    const handleCloseMessage = () => {
        setOpen(false);
        setSelectedItem(null);
        setSelectedAliciId(null);
    };

    const lastItem = filteredData[0];

    if (isUserPostsLoading || isPostsLoading) {
        return (
            <StatusMessage
                type="info"
                message="Yükleniyor..."
            />
        );
    }

    if (isUserPostsError || isPostsError) {
        return (
            <StatusMessage
                type="error"
                message="İlanlar yüklenirken bir hata oluştu."
            />
        );
    }

    return (
        <div className="w-[80%] px-20 relative">


            <div className="flex justify-left pl-2 items-center">

                {user?.file && (
                    <img
                        className="rounded-full p-3 h-40 w-40"
                        src={user.file}
                        alt="Profil"
                    />
                )}

                <ul className="pl-5">

                    <li
                        className="text-gray-800"
                        style={{ fontSize: "30px" }}
                    >
                        Merhaba{" "}
                        <strong>
                            {user?.firstName} 👋
                        </strong>
                    </li>

                    <li
                        className="text-gray-800"
                        style={{
                            fontSize: "20px",
                            fontFamily: "monospace",
                        }}
                    >
                        Bionluk'a tekrar hoş geldin!
                    </li>

                </ul>
            </div>


            <BuyerHeader/>

            <br />


            {lastItem ? (
                <BuyerRequestCard
                    item={lastItem}
                    expanded={expandedItems[lastItem.id]}
                    onToggleText={toggleText}
                    onMessage={handleMessage}
                />
            ) : (
                <p className="text-gray-400">
                    Son veri bulunamadı.
                </p>
            )}

  
            {open && selectedItem && (
                <Message
                    onClose={handleCloseMessage}
                    adi={selectedItem.kullaniciAd}
                    open={open}
                    gonderenId={userId}
                    aliciId={selectedAliciId}
                />
            )}

            <br />


            <div className="flex justify-between items-center pt-5">

                <h6 className="text-center text-gray-600">
                    Yayındaki <strong>İlanlarım</strong>
                </h6>

                <span>
                    <h3
                        className="text-purple-300 text-right cursor-pointer"
                        onClick={() => navigate("/ilanlarim")}
                    >
                        Tüm ilanlarım
                    </h3>
                </span>

            </div>

            <Ads />

        </div>
    );
}

