import { supabase, isSupabaseConfigured } from "./supabase";

export type DocumentType = "ID" | "PASSPORT" | "VISA" | "PROFILE_PHOTO";
export type DocumentStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface DocumentUploadResult {
  documentId: string;
  filePath: string;
  signedUrl: string;
}

export interface Document {
  id: string;
  user_id: string;
  type: DocumentType;
  file_name: string;
  file_path: string;
  status: DocumentStatus;
  uploaded_at: string;
  verified_at?: string;
  verified_by?: string;
  notes?: string;
}

// Convert file to base64 for Edge Function
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const documentService = {
  // Upload document using Edge Function
  async uploadDocument(
    file: File,
    type: DocumentType,
    notes?: string,
  ): Promise<DocumentUploadResult> {
    try {
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate upload
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          documentId: `demo-doc-${Date.now()}`,
          filePath: `demo/${file.name}`,
          signedUrl: "#",
        };
      }

      const base64File = await fileToBase64(file);

      const { data, error } = await supabase.functions.invoke(
        "document-upload",
        {
          body: {
            file: base64File,
            originalName: file.name,
            type: type,
            metadata: {
              notes: notes || "",
            },
          },
        },
      );

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  },

  // Get user's documents
  async getUserDocuments(): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  // Get pending documents (admin only)
  async getPendingDocuments(): Promise<
    (Document & { users: { email: string } })[]
  > {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*, users(email)")
        .eq("status", "PENDING")
        .order("uploaded_at", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching pending documents:", error);
      throw error;
    }
  },

  // Verify document (admin only)
  async verifyDocument(
    documentId: string,
    status: "VERIFIED" | "REJECTED",
    notes?: string,
  ): Promise<void> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "document-verify",
        {
          body: {
            documentId,
            status,
            notes: notes || "",
          },
        },
      );

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error verifying document:", error);
      throw error;
    }
  },

  // Get signed URL for viewing document
  async getDocumentUrl(filePath: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from("user-documents")
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error("Error getting document URL:", error);
      throw error;
    }
  },

  // Delete document
  async deleteDocument(documentId: string): Promise<void> {
    try {
      // First get the document to get file path
      const { data: doc, error: fetchError } = await supabase
        .from("documents")
        .select("file_path")
        .eq("id", documentId)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("user-documents")
        .remove([doc.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId);

      if (dbError) throw dbError;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  },
};
