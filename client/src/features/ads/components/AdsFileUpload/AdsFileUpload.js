import {Input} from "@/shared/components/atoms";
export default function AdsFileUpload ({ value, onChange }){
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            onChange(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            {value && (
                <div className="flex justify-center">
                    <img
                        src={value}
                        alt="İlan görseli"
                        className="h-40 w-40 rounded border-2 border-dashed object-cover"
                    />
                </div>
            )}

            <div className="flex justify-center rounded-lg border-2 border-dashed border-purple-300 bg-gray-50 p-6">
                <Input
                    label="İlan Görseli*"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-gray-800 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-white"
                />
            </div>
        </div>
    );
};

