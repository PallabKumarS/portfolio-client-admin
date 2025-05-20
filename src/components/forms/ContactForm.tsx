"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Sending message...");

    try {
      fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          toast.success("Message sent successfully!", { id: toastId });
          form.reset();
        } else {
          toast.error("Failed to submit the form. Please try again.", {
            id: toastId,
          });
        }
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.", {
        id: toastId,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name..."
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email..."
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message..."
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button effect={"gooeyLeft"} type="submit" className="h-8 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
