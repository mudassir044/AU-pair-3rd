"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import DocumentUpload from "@/components/document-upload";
import DocumentList from "@/components/document-list";

export default function DocumentsPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleUploadComplete = () => {
    // Trigger refresh of document list
    setRefreshTrigger((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const requiredDocuments =
    user.role === "au_pair"
      ? [
          "Passport Copy",
          "Background Check",
          "First Aid Certificate",
          "Reference Letters (2)",
          "Educational Certificates",
          "Medical Certificate",
        ]
      : [
          "Family Introduction Letter",
          "Home Photos",
          "Background Check",
          "Reference Letters",
          "Insurance Documents",
        ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upload and manage your verification documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <DocumentUpload onUploadComplete={handleUploadComplete} />

            {/* Required Documents Info */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Required Documents for{" "}
                {user.role === "au_pair" ? "Au Pairs" : "Host Families"}:
              </h3>
              <ul className="space-y-2">
                {requiredDocuments.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-blue-800 dark:text-blue-200"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {doc}
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> Documents are typically reviewed within
                  2-3 business days. You'll receive an email notification once
                  the review is complete.
                </p>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div>
            <DocumentList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}
