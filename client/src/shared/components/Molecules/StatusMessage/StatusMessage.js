export function StatusMessage  ({ type = "loading", message }) {
    const isError = type === "error";

    return (
        <div
            className={`flex justify-center items-center p-8 ${
                isError ? "text-center" : ""
            }`}
        >
            <p
                className={
                    isError
                        ? "text-purple-950"
                        : "text-gray-500"
                }
            >
                {message}
            </p>
        </div>
    );
};

