"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { documentService, DocumentType } from "@/lib/documents";
import { Upload, FileText, Image, CreditCard, Plane } from "lucide-react";

const documentTypes: {
  value: DocumentType;
  label: string;
  icon: any;
  description: string;
}[] = [
  {
    value: "ID",
    label: "ID Document",
    icon: CreditCard,
    description: "Government-issued ID card",
  },
  {
    value: "PASSPORT",
    label: "Passport",
    icon: FileText,
    description: "Passport for international travel",
  },
  {
    value: "VISA",
    label: "Visa",
    icon: Plane,
    description: "Visa or work permit",
  },
  {
    value: "PROFILE_PHOTO",
    label: "Profile Photo",
    icon: Image,
    description: "Professional profile picture",
  },
];

interface DocumentUploadProps {
  onUploadComplete?: () => void;
}

export default function DocumentUpload({
  onUploadComplete,
}: DocumentUploadProps) {
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        setError("Please select a valid file type (JPEG, PNG, or PDF)");
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedType) {
      setError("Please select a file and document type");
      return;
    }

    setUploading(true);
    setError("");

    try {
      await documentService.uploadDocument(selectedFile, selectedType, notes);

      // Reset form
      setSelectedFile(null);
      setSelectedType(null);
      setNotes("");

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Document
        </CardTitle>
        <CardDescription>
          Upload your verification documents for review
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Document Type Selection */}
        <div>
          <Label className="text-base font-semibold">Document Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {documentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedType === type.value
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedType(type.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedType === type.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm text-gray-500">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <Label htmlFor="file-upload" className="text-base font-semibold">
            Select File
          </Label>
          <div className="mt-3">
            <Input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: JPEG, PNG, PDF (max 10MB)
            </p>
          </div>
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="text-base font-semibold">
            Notes (Optional)
          </Label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes about this document..."
            className="w-full mt-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !selectedType || uploading}
          className="w-full"
          size="lg"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </Button>
      </CardContent>
    </Card>
  );
}
