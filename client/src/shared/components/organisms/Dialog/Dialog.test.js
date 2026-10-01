import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { Dialog } from "./Dialog";

function Harness() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Aç
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Örnek">
        <input aria-label="Alan" />
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("is labelled, traps focus and closes with Escape", async () => {
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Aç" });

    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Örnek" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: "Kapat" })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByLabelText("Alan")).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Kapat" })).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
