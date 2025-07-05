"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { documentService, Document } from "@/lib/documents";
import {
  FileText,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

interface DocumentListProps {
  refreshTrigger?: number;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Clock className="w-4 h-4" />;
    case "VERIFIED":
      return <CheckCircle className="w-4 h-4" />;
    case "REJECTED":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "VERIFIED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "REJECTED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function DocumentList({ refreshTrigger }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const docs = await documentService.getUserDocuments();
      setDocuments(docs);
    } catch (err: any) {
      setError(err.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshTrigger]);

  const handleViewDocument = async (document: Document) => {
    try {
      const url = await documentService.getDocumentUrl(document.file_path);
      window.open(url, "_blank");
    } catch (err: any) {
      setError(err.message || "Failed to view document");
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      await documentService.deleteDocument(documentId);
      await fetchDocuments(); // Refresh list
    } catch (err: any) {
      setError(err.message || "Failed to delete document");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          My Documents
        </CardTitle>
        <CardDescription>
          View and manage your uploaded documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300 mb-6">
            {error}
          </div>
        )}

        {documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((document) => (
              <Card key={document.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">
                          {document.type.replace("_", " ")}
                        </h3>
                        <Badge
                          className={`flex items-center gap-1 ${getStatusColor(document.status)}`}
                        >
                          {getStatusIcon(document.status)}
                          {document.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {document.file_name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Uploaded:{" "}
                        {format(
                          new Date(document.uploaded_at),
                          "MMM dd, yyyy HH:mm",
                        )}
                      </p>

                      {document.verified_at && (
                        <p className="text-xs text-gray-500">
                          Verified:{" "}
                          {format(
                            new Date(document.verified_at),
                            "MMM dd, yyyy HH:mm",
                          )}
                        </p>
                      )}

                      {document.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                          Note: {document.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDocument(document)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {document.status === "PENDING" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDocument(document.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
