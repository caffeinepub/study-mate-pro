import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUploadFile } from '@/hooks/useUserFiles';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export function FileUploadPanel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { identity } = useInternetIdentity();
  const uploadMutation = useUploadFile();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      uploadMutation.reset(); // Clear previous status
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    try {
      await uploadMutation.mutateAsync(selectedFile);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Sign in to upload your study materials</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to upload files. Use the Sign In button in the header.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
        <CardDescription>Upload your educational materials for processing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-input">Select File</Label>
          <Input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            disabled={uploadMutation.isPending}
            accept=".pdf,.doc,.docx,.txt,.md"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
          className="w-full"
        >
          {uploadMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </>
          )}
        </Button>

        {uploadMutation.isSuccess && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400">
              File uploaded successfully!
            </AlertDescription>
          </Alert>
        )}

        {uploadMutation.isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {uploadMutation.error instanceof Error
                ? uploadMutation.error.message
                : 'Failed to upload file. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        {!selectedFile && !uploadMutation.isPending && !uploadMutation.isSuccess && (
          <p className="text-sm text-muted-foreground">
            Supported formats: PDF, DOC, DOCX, TXT, MD
          </p>
        )}
      </CardContent>
    </Card>
  );
}
