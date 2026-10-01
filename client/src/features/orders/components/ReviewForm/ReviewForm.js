import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useReviewOrder } from "../../hooks/useReviews";
import { reviewSchema } from "../../schemas";

const SCORES = [1, 2, 3, 4, 5];

export default function ReviewForm({ orderId }) {
  const reviewOrder = useReviewOrder(orderId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5, comment: "" } });

  return (
    <form
      onSubmit={handleSubmit((values) => reviewOrder.mutate(values))}
      className="space-y-4 rounded-lg border bg-white p-6"
      noValidate
    >
      <fieldset>
        <legend className="mb-2 font-semibold text-gray-700">Puanın</legend>
        <div className="flex gap-3">
          {SCORES.map((score) => (
            <label key={score} className="flex items-center gap-1">
              <input type="radio" value={score} {...register("rating")} />
              {score} ★
            </label>
          ))}
        </div>
        {errors.rating && (
          <p role="alert" className="text-sm text-red-600">
            {errors.rating.message}
          </p>
        )}
      </fieldset>
      <FormField label="Yorumun" htmlFor="review-comment" error={errors.comment?.message}>
        <Textarea
          id="review-comment"
          rows={3}
          className="w-full rounded border-2 border-purple-300 p-2"
          {...register("comment")}
        />
      </FormField>
      <Button
        type="submit"
        variant="primary"
        className="px-6 py-2"
        disabled={reviewOrder.isPending}
      >
        Değerlendir
      </Button>
    </form>
  );
}
