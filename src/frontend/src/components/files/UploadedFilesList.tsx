import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, AlertCircle, Inbox } from 'lucide-react';
import { useListUserFiles } from '@/hooks/useUserFiles';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export function UploadedFilesList() {
  const { identity } = useInternetIdentity();
  const { data: files, isLoading, isError, error } = useListUserFiles();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Uploaded Files</CardTitle>
          <CardDescription>Files you have uploaded for processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Uploaded Files</CardTitle>
          <CardDescription>Files you have uploaded for processing</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load files. Please try again.'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Uploaded Files</CardTitle>
        <CardDescription>
          {files && files.length > 0
            ? `${files.length} file${files.length === 1 ? '' : 's'} uploaded`
            : 'No files uploaded yet'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!files || files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No files uploaded yet. Upload your first file to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="p-2 rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.filename}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                    <span>{file.contentType || 'Unknown type'}</span>
                    <span>{(file.size / 1024).toFixed(2)} KB</span>
                    <span>
                      {new Date(Number(file.uploadedAt) / 1000000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
