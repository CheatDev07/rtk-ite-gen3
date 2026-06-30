"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useUploadFilesMutation } from "@/services/uploadApi";

type Props = {
  onUploadComplete: (url: string) => void;
};

export function FileUploadCircularProgressDemo({ onUploadComplete }: Props) {
  const [uploadFiles] = useUploadFilesMutation();
  const [files, setFiles] = React.useState<File[]>([]);

  const onUpload = React.useCallback(
    async (
      filesToUpload: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
     
      filesToUpload.forEach((file) => onProgress(file, 50));

      try {
        // Upload files sequentially (API expects a single File per call)
        for (const file of filesToUpload) {
          try {
            const result = await uploadFiles(file as unknown as File).unwrap();
            // Expecting single file response with a url
            onProgress(file, 100);
            onUploadComplete(result.name ?? result.name ?? "");
            onSuccess(file);
          } catch (err) {
            onError(file, err instanceof Error ? err : new Error("Upload failed"));
          }
        }
      } catch (error) {
        filesToUpload.forEach((file) =>
          onError(
            file,
            error instanceof Error ? error : new Error("Upload failed"),
          ),
        );
      }
    },
    [uploadFiles, onUploadComplete],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      className="w-160"
      onUpload={onUpload}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList orientation="horizontal">
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="p-0">
            <FileUploadItemPreview className="size-20 [&>svg]:size-12">
              <FileUploadItemProgress variant="circular" size={40} />
            </FileUploadItemPreview>
            <FileUploadItemMetadata className="sr-only" />
            <FileUploadItemDelete asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute -top-1 -right-1 size-5 rounded-full"
              >
                <X className="size-3" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}