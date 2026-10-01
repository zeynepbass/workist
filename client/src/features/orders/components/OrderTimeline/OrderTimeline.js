import { ORDER_EVENT_LABELS, formatDateTime } from "../../constants";

export default function OrderTimeline({ events, participants }) {
  const nameOf = (actorId) =>
    participants.find((user) => user?.id === actorId)?.fullName ?? "Kullanıcı";

  return (
    <section className="rounded-lg border bg-white p-6" aria-label="Sipariş süreci">
      <h2 className="mb-6 text-lg font-semibold">Sipariş Süreci</h2>
      <ol className="space-y-4 border-l-2 border-gray-200 pl-6">
        {[...events].reverse().map((event) => (
          <li key={event.id} className="relative">
            <span
              className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-purple-500"
              aria-hidden="true"
            />
            <p className="font-semibold text-gray-800">{ORDER_EVENT_LABELS[event.action]}</p>
            <p className="text-sm text-gray-500">
              {nameOf(event.actorId)} · {formatDateTime(event.at)}
            </p>
            {event.note && <p className="mt-1 text-sm text-gray-600">{event.note}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
