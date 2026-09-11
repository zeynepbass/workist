export default function OrderFiles  ({ file })  {
    return (
      <section>
        <h2 className="text-sm font-semibold mt-5 mb-2 text-gray-400">
          Siparişe Ait<strong> Dosyalar</strong>
        </h2>
  
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200 mt-6 w-[40vh]">
          📎 &nbsp;
          <span>{file.name}</span>
  
          <br />
  
          <span className="text-gray-400 text-xs pl-5">
            {file.date}
          </span>
        </div>
      </section>
    );
  };
  
