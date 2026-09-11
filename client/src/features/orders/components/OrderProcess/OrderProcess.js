import ProcessItem from "./ProcessItem";

export default function OrderProcess  ({ steps = [] }) {
    return (
        <div className="bg-white rounded-lg p-6 border">
            <h4 className="text-lg font-semibold mb-6">
                Sipariş Süreci
            </h4>

            <div>
                {steps.map((step, index) => (
                    <ProcessItem
                        key={`${step.type}-${index}`}
                        step={step}
                        isLast={index === steps.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

