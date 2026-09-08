export function AdsFileUpload ({ value, onChange }){
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
        <div>
            <label className="block font-semibold text-gray-700 mb-1">
                Dosya Yükle
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            {value && (
                <img
                    src={value}
                    alt="İlan görseli"
                    className="mt-3 w-32 h-32 object-cover rounded"
                />
            )}
        </div>
    );
};

