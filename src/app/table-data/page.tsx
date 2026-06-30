"use client"
import { useState } from "react";
import { columns } from "@/components/tables/Columns";
import { DataTable } from "@/components/tables/TableComponent";
import { ViewProductDetail } from "@/components/ui/view-detail-product";
import { useDeleteProductByUUIDMutation, useGetAllProductQuery, useUpdateProductMutation } from "@/services/ecommerce";
import { UpdateProductType } from "@/lib/products";

export default function DataTablePage() {
  const { data } = useGetAllProductQuery({
  page: 0,
  size: 10000
  });
  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  // mock data of update product 
  const updateProduct  =  {
    "name": "Dell XPS 15 9530",
    "description": "Premium ultrabook with a stunning InfinityEdge display",
    "stockQuantity": 18,
    "priceIn": 1420,
    "priceOut": 1799,
    "discount": 8,
    "color": [
      {
        "color": "Platinum Silver",
        "images": [
          "https://example.com/images/dell-xps-15/silver-1.jpg",
          "https://example.com/images/dell-xps-15/silver-2.jpg"
        ]
      },
      {
        "color": "Graphite Black",
        "images": [
          "https://example.com/images/dell-xps-15/black-1.jpg"
        ]
      }
    ],
    "thumbnail": "https://i.pinimg.com/736x/77/75/ee/7775ee85f8959ca81086944bfbe93855.jpg",
    "warranty": "2 years international warranty",
    "availability": true,
    "images": [
      "https://example.com/images/dell-xps-15/main-1.jpg",
      "https://example.com/images/dell-xps-15/main-2.jpg"
    ],
    "categoryUuid": "462d9f60-8346-45ab-b8b3-a597d240965b",
    "supplierUuid": "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
    "brandUuid": "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb"
  }

  const [updateProductByUUID] = useUpdateProductMutation();
  const [deleteProductByUUID] = useDeleteProductByUUIDMutation();

  // handle delete ProductByUUID 
  const handleDeleteProductByUUID = (uuid:string) =>{
    deleteProductByUUID(
      {
        uuid:uuid,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string
      }
    )
  }
  // handle update ProductByUUID 
  const handleUpdateProductByUUID= (uuid:string) =>{
    updateProductByUUID(
      {
        uuid: uuid,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
        updateProduct: updateProduct as UpdateProductType
      }
    )
  }

  const handleSelectUUID = (uuid: string) => {
    setSelectedUuid(uuid);
  };

  const handleClose = () => {
    setSelectedUuid(null);
  };


  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({ onViewDetail:handleSelectUUID , handleDeleteProductByUUID, handleUpdateProductByUUID})}
        data={tableData}
      />

      {/* Modal */}
      {selectedUuid && (
        <ViewProductDetail
          uuid={selectedUuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        />

        


      )}
    </div>
  );
}