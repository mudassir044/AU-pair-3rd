"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";
import Link from "next/link";

interface UploadFile {
  file: File;
  type: string;
  progress: number;
  status: "uploading" | "success" | "error";
  id: string;
}

const documentTypes = [
  { value: "passport", label: "Passport/ID Document" },
  { value: "visa", label: "Visa/Work Authorization" },
  { value: "background_check", label: "Background Check" },
  { value: "medical_certificate", label: "Medical Certificate" },
  { value: "insurance", label: "Insurance Documents" },
  { value: "education", label: "Education Certificates" },
  { value: "reference", label: "Reference Letters" },
  { value: "photo", label: "Profile Photos" },
  { value: "other", label: "Other" },
];

export default function DocumentUploadPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      file,
      type: "other",
      progress: 0,
      status: "uploading" as const,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setUploadFiles((prev) => [...prev, ...newFiles]);

    // Start uploads
    newFiles.forEach((uploadFile) => {
      uploadDocument(uploadFile);
    });
  };

  const uploadDocument = async (uploadFile: UploadFile) => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) throw new Error("No auth token");

      const formData = new FormData();
      formData.append("file", uploadFile.file);
      formData.append("type", uploadFile.type);

      // Simulate progress for demo
      const progressInterval = setInterval(() => {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  progress: Math.min(f.progress + Math.random() * 20, 90),
                }
              : f,
          ),
        );
      }, 500);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/documents/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      clearInterval(progressInterval);

      if (response.ok) {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, progress: 100, status: "success" }
              : f,
          ),
        );
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "error" } : f,
        ),
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFileType = (id: string, type: string) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, type } : f)),
    );
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/documents">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Documents
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Upload Documents
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your documents to complete verification
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload your documents for verification. Supported formats: PDF,
              JPG, PNG, DOC, DOCX
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <div className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Drop files here or click to browse
              </div>
              <div className="text-sm text-gray-500 mb-6">
                Maximum file size: 10MB per file
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="mb-4"
              >
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {uploadFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploading Files</CardTitle>
              <CardDescription>
                Review and categorize your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadFiles.map((uploadFile) => (
                  <div
                    key={uploadFile.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {uploadFile.status === "success" ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : uploadFile.status === "error" ? (
                        <XCircle className="w-8 h-8 text-red-500" />
                      ) : (
                        <FileText className="w-8 h-8 text-blue-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {uploadFile.file.name}
                        </p>
                        <button
                          onClick={() => removeFile(uploadFile.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <select
                          value={uploadFile.type}
                          onChange={(e) =>
                            updateFileType(uploadFile.id, e.target.value)
                          }
                          className="text-sm border rounded px-2 py-1 bg-background"
                          disabled={uploadFile.status === "uploading"}
                        >
                          {documentTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>

                        <span className="text-xs text-gray-500">
                          {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>

                      {uploadFile.status === "uploading" && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadFile.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Uploading... {Math.round(uploadFile.progress)}%
                          </p>
                        </div>
                      )}

                      {uploadFile.status === "success" && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          ✓ Upload completed successfully
                        </p>
                      )}

                      {uploadFile.status === "error" && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                          ✗ Upload failed. Please try again.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Requirements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>Document Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Required Documents:</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Valid Passport or ID</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Background Check</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Medical Certificate</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Optional Documents:</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Education Certificates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Reference Letters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Insurance Documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
