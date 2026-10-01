import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { noteSchema } from "../../schemas";

export default function NoteForm({ label, submitLabel, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(noteSchema), defaultValues: { note: "" } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField label={label} htmlFor="order-note" error={errors.note?.message}>
        <Textarea
          id="order-note"
          rows={4}
          className="w-full rounded border-2 border-purple-300 p-2"
          {...register("note")}
        />
      </FormField>
      <Button type="submit" variant="primary" className="w-full py-2" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
