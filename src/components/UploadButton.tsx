"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "../utils/uploadthing";

interface ButtonProps {
  onSubmit: (imageUrl: string) => void;
  setStatus: (status: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function Button({
  setLoading,
  onSubmit,
  setStatus,
}: ButtonProps) {
  return (
    <main className="flex flex-col items-center justify-between ">
      <UploadButton
        onUploadBegin={() => {
          setLoading(true);
          setStatus("Uploading image...");
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res) return;
          onSubmit(res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
