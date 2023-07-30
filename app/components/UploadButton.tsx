"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "../src/utils/uploadthing";

interface ButtonProps {
  onSubmit: (imageUrl: string) => void;
}

export default function Button({ onSubmit }: ButtonProps) {
  return (
    <main className="flex flex-col items-center justify-between ">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res) return;
          onSubmit(res[0].fileUrl);
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
