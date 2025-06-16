"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
});

type Status = "idle" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to subscribe");

      toast({
        title: "Subscribed!",
        description: `You're subscribed with ${data.email}`,
      });

      setStatus("success");
    } catch (err) {
      toast({
        title: "Subscription failed",
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
        variant: "destructive",
      });

      setStatus("error");
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="w-full sm:max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 transition-all duration-300"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscribe to our newsletter</FormLabel>
                <FormControl>
                  <div className="flex h-10 items-center justify-center rounded-full border text-center text-sm font-semibold">
                    {status === "success" ? (
                      <>
                        ✓ Subscribed{" "}
                        <span className="pl-1 text-green-600">
                          Successfully
                        </span>
                      </>
                    ) : status === "error" ? (
                      <>
                        ✕ Subscription{" "}
                        <span className="pl-1 text-red-600">Failed</span>
                      </>
                    ) : (
                      <Input
                        type="email"
                        placeholder="janedoe@example.com"
                        className="rounded-full px-4"
                        disabled={isSubmitting}
                        {...field}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status === "idle" && (
            <Button
              type="submit"
              size="sm"
              rounded="full"
              className="flex items-center justify-center px-4"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <span
                  aria-label="Loading..."
                  role="status"
                  style={{
                    display: "inline-block",
                    width: 16,
                    height: 16,
                    border: "2px solid transparent",
                    borderTopColor: "#000",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "Subscribe"
              )}
            </Button>
          )}

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </form>
      </Form>
    </div>
  );
}
