import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Button, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useCreateOrder } from "../../hooks/useOrders";
import { orderRequestSchema } from "../../schemas";

export default function OrderRequestForm({ adId }) {
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(orderRequestSchema), defaultValues: { requirements: "" } });

  const submit = handleSubmit(({ requirements }) =>
    createOrder.mutate(
      { adId, requirements },
      { onSuccess: (order) => navigate(`/siparisler/${order.id}`) },
    ),
  );

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <FormField
        label="Ne istediğini anlat"
        htmlFor="order-requirements"
        error={errors.requirements?.message}
      >
        <Textarea
          id="order-requirements"
          rows={4}
          className="w-full rounded border-2 border-purple-300 p-2"
          {...register("requirements")}
        />
      </FormField>
      <Button
        type="submit"
        variant="primary"
        className="w-full py-2"
        disabled={createOrder.isPending}
      >
        {createOrder.isPending ? "Gönderiliyor..." : "Sipariş Talebi Gönder"}
      </Button>
    </form>
  );
}
