// components/product-form/CreateProductForm.tsx
"use client";

import { Controller, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { ProductForm, productFormSchema } from "./productform/product-form-schema";
import { productFields } from "./productform/product-form-fields";
import { DynamicFormField } from "./productform/DynamicFormField";
import { FileUploadCircularProgressDemo } from "./FileUploadComponent";
import z from "zod";

type ProductFormValue = z.infer<typeof productFormSchema>;

export function CreateProductForm() {
  const form = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValue>,
    defaultValues: {
      name: "",
      description: "",
      stockQuantity: 0,
      priceIn: 0,
      priceOut: 0,
      discount: 0,
      warranty: "",
      availability: true,
      categoryUuid: "",
      supplierUuid: "",
      brandUuid: "",
      thumbnail: "",
    },
  });

  console.log("Form: ", form.formState.errors);

  const onSubmit = (data: ProductForm) => {
    console.log("Product Data:", data);
    toast.success("Product created successfully!");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>
          Fill in all the necessary information for the new product.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {productFields.map((fieldConfig) => (
            <DynamicFormField
              key={fieldConfig.name}
              fieldConfig={fieldConfig}
              control={form.control}
            />
          ))}

          {/* Image Upload Section */}
          <Controller
            name="thumbnail"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <FileUploadCircularProgressDemo
                  onUploadComplete={(url) => field.onChange(url)}
                />
                {fieldState.error && (
                  <p className="text-sm text-destructive mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className="w-full justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="product-form">
            Create Product
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}