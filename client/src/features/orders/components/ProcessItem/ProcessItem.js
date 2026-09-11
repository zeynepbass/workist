export default function ProcessItem  ({ step, isLast }) {
    const typeStyles = {
        completed: {
            icon: "✓",
            iconClass: "bg-green-100 text-green-600",
        },
        delivered: {
            icon: "✓",
            iconClass: "bg-blue-100 text-blue-600",
        },
        support: {
            icon: "!",
            iconClass: "bg-yellow-100 text-yellow-600",
        },
        started: {
            icon: "→",
            iconClass: "bg-purple-100 text-purple-600",
        },
        "new-order": {
            icon: "+",
            iconClass: "bg-gray-100 text-gray-600",
        },
    };

    const style = typeStyles[step.type] || typeStyles["new-order"];

    return (
        <div className="relative flex gap-4">
            {!isLast && (
                <div className="absolute left-5 top-10 w-px h-full bg-gray-200" />
            )}

            <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold ${style.iconClass}`}
            >
                {style.icon}
            </div>

            <div className="flex-1 pb-8">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h5 className="font-semibold text-gray-800">
                            {step.title}
                        </h5>

                        <p className="text-sm text-gray-500 mt-1">
                            {step.description}
                        </p>
                    </div>

                    <span className="text-xs text-gray-400 whitespace-nowrap">
                        {step.time}
                    </span>
                </div>
            </div>
        </div>
    );
};

