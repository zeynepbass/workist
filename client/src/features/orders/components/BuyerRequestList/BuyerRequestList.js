
import BuyerRequestCard from "../BuyerRequestCard";

export default function BuyerRequestList({
    items,
    expandedItems,
    onToggleText,
    onMessage,
}) {
    if (!items || items.length === 0) {
        return (
            <p className="text-gray-400">
                Alıcı isteği bulunamadı.
            </p>
        );
    }

    return (
        <>
            {items.map((item) => (
                <BuyerRequestCard
                    key={item.id}
                    item={item}
                    expanded={expandedItems[item.id]}
                    onToggleText={onToggleText}
                    onMessage={onMessage}
                />
            ))}
        </>
    );
}

