export default function formatToTurkishDate(dateString){

        const options = {
            timeZone: "Europe/Istanbul",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };
        return new Date(dateString).toLocaleDateString("tr-TR", options)
}