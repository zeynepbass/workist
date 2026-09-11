import { Button, Input } from "@/shared/components/atoms";

export default function ChatInput({
    value,
    onChange,
    onSubmit,
    disabled,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="flex items-center space-x-2 border-t bg-white p-3"
        >
            <Input
                type="text"
                value={value}
                onChange={onChange}
                className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Mesajınızı yazın..."
            />

            <Button
                type="submit"
                disabled={disabled}
                className="rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Gönder
            </Button>
        </form>
    );
}