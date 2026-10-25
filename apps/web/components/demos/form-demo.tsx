"use client";

import { Button, Form, TextField } from "@hewnui/ui";

export function FormDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Form
        aria-label="Workspace invite"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          isRequired
          placeholder="ops@andruia.dev"
        />
        <TextField
          label="Role"
          name="role"
          defaultValue="editor"
          description="Editors can publish; viewers cannot."
        />
        <Button type="submit">Send invite</Button>
      </Form>
    </div>
  );
}
