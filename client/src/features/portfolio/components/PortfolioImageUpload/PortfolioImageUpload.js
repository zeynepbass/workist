import { FaFileImage } from "react-icons/fa";
import { Input } from "@/shared/components/atoms";

export default function PortfolioImageUpload  ({
    file,
    onChange,
})  {
    return (
        <div className="space-y-4">

            {file && (
                <div className="flex justify-center">
                    <img
                        src={file}
                        width="400"
                        height="400"
                        className="border-2 border-dashed object-contain"
                        alt="Portfolyo"
                    />
                </div>
            )}

            <div className="border-2 border-dashed border-purple-300 p-4 rounded bg-gray-100 flex justify-center">

                <div className="py-5">

                    <div className="flex justify-center">
                        <Input
                            label="Dosya Seç"
                            type="file"
                            onChange={onChange}
                            className="text-gray-800 file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:cursor-pointer"
                            accept="image/png, image/jpeg"
                        />
                    </div>

                    <div className="py-3 flex items-center justify-center">

                        <span className="text-sm text-gray-500">
                            JPG, PNG dosyalarını yükleyebilirsin
                        </span>

                        <FaFileImage className="text-gray-400 text-2xl pl-3" />

                    </div>

                </div>

            </div>

        </div>
    );
};

