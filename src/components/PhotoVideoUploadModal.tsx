import React, { useState, useRef, useCallback } from 'react';
import {
  X,
  Camera,
  Video,
  Upload,
  Trash,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  FileVideo
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: number;
  url: string;
  thumbnail?: string;
  uploadTime: Date;
  status: 'uploading' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

interface PhotoVideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: UploadedFile[]) => void;
  title?: string;
  description?: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  allowedTypes?: ('image' | 'video')[];
  jobId?: string;
  jobTitle?: string;
}

export const PhotoVideoUploadModal: React.FC<PhotoVideoUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  title = 'Upload Photos & Videos',
  description = 'Upload photos and videos related to this job',
  maxFiles = 10,
  maxFileSize = 50, // 50MB
  allowedTypes = ['image', 'video'],
  jobId,
  jobTitle
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        return null;
      }

      if (file.size > maxFileSize * 1024 * 1024) {
        return null;
      }

      const fileId = `${Date.now()}-${index}`;
      const url = URL.createObjectURL(file);
      
      return {
        id: fileId,
        name: file.name,
        type: isImage ? 'image' : 'video',
        size: file.size,
        url,
        uploadTime: new Date(),
        status: 'uploading' as const,
        progress: 0
      };
    }).filter(Boolean) as UploadedFile[];

    // Simulate upload progress
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, progress: Math.min((f.progress || 0) + 10, 100) }
              : f
          )
        );
        
        if ((file.progress || 0) >= 100) {
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, status: 'completed' as const }
                : f
            )
          );
        }
      }, 200);
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, [maxFileSize]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFileSelect]);

  const handleRemoveFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file) {
        URL.revokeObjectURL(file.url);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const handleCapturePhoto = useCallback(() => {
    console.log('Camera capture clicked');
  }, []);

  const handleRecordVideo = useCallback(() => {
    console.log('Video recording clicked');
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = useCallback(() => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    onUpload(completedFiles);
    onClose();
  }, [uploadedFiles, onUpload, onClose]);

  const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
  const uploadingFiles = uploadedFiles.filter(f => f.status === 'uploading');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            {jobId && jobTitle && (
              <p className="text-sm text-gray-600 mt-1">
                Job: {jobTitle} ({jobId})
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-4 sm:space-y-6">
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-4 sm:p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-[#10BF0A] bg-[rgba(16,191,10,0.05)]' 
                  : 'border-[#E5E7EB] hover:border-[#10BF0A]'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg font-medium text-black dark:text-white mb-2">
                Drag and drop files here, or click to select
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Supported formats: {allowedTypes.join(', ')} • Max size: {maxFileSize}MB • Max files: {maxFiles}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors text-sm"
                >
                  Choose Files
                </button>
                <button
                  onClick={handleCapturePhoto}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                >
                  <Camera className="w-4 h-4 inline mr-2" />
                  Take Photo
                </button>
                <button
                  onClick={handleRecordVideo}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                >
                  <Video className="w-4 h-4 inline mr-2" />
                  Record Video
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={allowedTypes.map(type => 
                  type === 'image' ? 'image/*' : 'video/*'
                ).join(',')}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Uploading Files */}
            {uploadingFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-black dark:text-white">Uploading...</h3>
                {uploadingFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg">
                    <Clock className="w-5 h-5 text-[#F59E0B] animate-spin" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black dark:text-white">{file.name}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-[#10BF0A] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#6C6C6C] mt-1">
                        {file.progress || 0}% • {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Uploaded Files */}
            {completedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-black dark:text-white">Uploaded Files</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {completedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative group border border-[#E5E7EB] rounded-lg overflow-hidden"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedFile(file)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center cursor-pointer" onClick={() => setSelectedFile(file)}>
                            <FileVideo className="w-12 h-12 text-[#6C6C6C]" />
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="p-2">
                        <p className="text-xs font-medium text-black dark:text-white truncate">{file.name}</p>
                        <p className="text-xs text-[#6C6C6C]">{formatFileSize(file.size)}</p>
                      </div>

                      {/* Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setSelectedFile(file)}
                            className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemoveFile(file.id)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            <Trash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        <CheckCircle className="w-4 h-4 text-[#10BF0A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
          <div className="text-sm text-[#6C6C6C]">
            {completedFiles.length} of {maxFiles} files uploaded
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#E5E7EB] text-[#6C6C6C] rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={completedFiles.length === 0}
              className="px-6 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] disabled:bg-[#6C6C6C] disabled:cursor-not-allowed transition-colors"
            >
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {selectedFile.type === 'image' ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <video
                ref={videoRef}
                src={selectedFile.url}
                controls
                className="max-w-full max-h-full rounded-lg"
              />
            )}
            
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm opacity-75">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
