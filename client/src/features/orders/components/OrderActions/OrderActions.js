import { useState } from "react";

import { Button } from "@/shared/components/atoms";
import { Dialog } from "@/shared/components/organisms";
import { ORDER_ACTION_LABELS } from "../../constants";
import { useOrderAction } from "../../hooks/useOrders";
import DeliverForm from "../DeliverForm";
import NoteForm from "../NoteForm";
import OfferForm from "../OfferForm";

const DIRECT_ACTIONS = new Set(["accept", "complete"]);
const NOTE_LABELS = {
  request_revision: "Neyin değişmesini istiyorsun?",
  cancel: "İptal nedeni (isteğe bağlı)",
};

export default function OrderActions({ order }) {
  const [activeAction, setActiveAction] = useState(null);
  const orderAction = useOrderAction(order.id);

  const run = (action, payload = {}) =>
    orderAction.mutate({ action, payload }, { onSuccess: () => setActiveAction(null) });

  if (order.availableActions.length === 0) {
    return null;
  }

  const dialogContent = {
    offer: (
      <OfferForm
        defaultValues={order.offer ?? undefined}
        isSubmitting={orderAction.isPending}
        onSubmit={(values) => run("offer", values)}
      />
    ),
    deliver: (
      <DeliverForm
        isSubmitting={orderAction.isPending}
        onSubmit={(values) => run("deliver", values)}
      />
    ),
    request_revision: (
      <NoteForm
        label={NOTE_LABELS.request_revision}
        submitLabel="Revizyon iste"
        isSubmitting={orderAction.isPending}
        onSubmit={(values) => run("request_revision", values)}
      />
    ),
    cancel: (
      <NoteForm
        label={NOTE_LABELS.cancel}
        submitLabel="Siparişi iptal et"
        isSubmitting={orderAction.isPending}
        onSubmit={(values) => run("cancel", values)}
      />
    ),
  };

  return (
    <section
      className="flex flex-wrap gap-3 rounded-lg border bg-white p-4"
      aria-label="Sipariş işlemleri"
    >
      {order.availableActions.map((action) => (
        <Button
          key={action}
          variant={action === "cancel" ? "danger" : "primary"}
          className="px-4 py-2"
          disabled={orderAction.isPending}
          onClick={() => (DIRECT_ACTIONS.has(action) ? run(action) : setActiveAction(action))}
        >
          {ORDER_ACTION_LABELS[action]}
        </Button>
      ))}

      <Dialog
        open={Boolean(activeAction)}
        onClose={() => setActiveAction(null)}
        title={ORDER_ACTION_LABELS[activeAction] ?? ""}
        size="md"
      >
        {activeAction && dialogContent[activeAction]}
      </Dialog>
    </section>
  );
}
