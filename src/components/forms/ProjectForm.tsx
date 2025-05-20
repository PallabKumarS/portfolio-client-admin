"use client";

import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TMongoose, TProject } from "@/types/types";
import ShimmerButton from "../shared/ShimmerButton";
import { Loader2, MinusCircle, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { createProject, updateProject } from "@/services/project.service";
import { DragDropUploader } from "../shared/DragDropUploader";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  images: z.array(
    z.object({
      value: z.string().url("Please enter a image repository URL").min(1),
    })
  ),
  technology: z.string().min(1, "At least one technology is required"),
  liveLink: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Live link is required"),
  clientRepo: z
    .string()
    .url("Please enter a valid repository URL")
    .min(1, "Client repository link is required"),
  serverRepo: z.string().url("Please enter a valid repository URL").optional(),
  description: z.string().min(1, "Description is required"),
});

export default function ProjectForm({
  data,
  setIsOpen,
  edit = false,
}: {
  data?: TProject & TMongoose;
  setIsOpen: (isOpen: boolean) => void;
  edit?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      images: data?.images.map((img) => {
        return { value: img };
      }) || [{ value: "" }],
      technology: data?.technology.join(", ") || "",
      liveLink: data?.liveLink || "",
      clientRepo: data?.clientRepo || "",
      serverRepo: data?.serverRepo || "",
      description: data?.description || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const {
    append: appendImage,
    fields: imageFields,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const addImage = () => {
    appendImage({ value: "" });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const images = values.images.map((image) => image.value);
    const toastId = toast.loading(
      edit ? "Updating project..." : "Creating project..."
    );


    const newData = {
      title: values.title,
      images: images,
      technology: values.technology.split(",").map((tech) => tech.trim()),
      liveLink: values.liveLink,
      clientRepo: values.clientRepo,
      serverRepo: values.serverRepo,
      description: values.description,
    };

    try {
      const res = edit
        ? await updateProject(newData, data?._id as string)
        : await createProject(newData);

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
        form.reset();
        setIsOpen(false);
      } else {
        throw new Error("Failed to submit project");
      }
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
        {/* project title  */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project title..."
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* images field  */}
        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">
              Add Appropriate Images
            </p>
            <Button
              variant="outline"
              className="size-10"
              onClick={addImage}
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {imageFields.map((imageField, index) => (
              <div key={imageField.id} className="relative">
                <FormField
                  control={form.control}
                  name={`images.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Paste image URL"
                          value={field.value || ""}
                          className="pr-7"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {imageField.value && (
                  <Button
                    variant="ghost"
                    className="absolute bottom-0 -right-2 hover:bg-base cursor-pointer"
                    onClick={() => removeImage(index)}
                    type="button"
                  >
                    <MinusCircle className="text-red-500 size-5 z-10" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* drag and drop field  */}
        <DragDropUploader
          name="images"
          label="Upload your image(s)"
          multiple={true}
        />

        <FormField
          control={form.control}
          name="technology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology</FormLabel>
              <FormControl>
                <Input
                  placeholder="technology1, technology2, technology3,..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                For multiple technology, use &quot;,&quot;
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="liveLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project live link..."
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
          name="clientRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Repo.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project client repository link..."
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
          name="serverRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Repo.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project server repository link..."
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter projects descriptions..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-start">
          <ShimmerButton type="submit">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
          </ShimmerButton>
        </div>
      </form>
    </Form>
  );
}
