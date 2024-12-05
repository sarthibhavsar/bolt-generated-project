import { useState, useCallback, useEffect, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { UploadIcon, XIcon, CheckIcon, FileIcon, FileSpreadsheetIcon, FileTextIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import PropTypes from 'prop-types';

// Default allowed file types
const DEFAULT_ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']

export function CompactFileUploader({onChange = () => {}, accept, reload = false, ...rest}) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)

  const allowedFileTypes = useMemo(() => {
    if (!accept) return DEFAULT_ALLOWED_FILE_TYPES;
    
    const types = accept.split(',').map(type => type.trim());
    const fileTypes = [];
    // console.log(types)
    if (types.includes('image/*')) {
      fileTypes.push('image/jpeg', 'image/png', 'image/gif');
    }
    if (types.includes('video/*')) {
      fileTypes.push('video/mp4', 'video/mpeg', 'video/quicktime');
    }
    if (types.includes('excel') || types.includes('csv')) {
      fileTypes.push('text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel');
    }
    if (types.includes('pdf')) {
      fileTypes.push('application/pdf');
    }
    // console.log(fileTypes)
    return fileTypes.length > 0 ? fileTypes : DEFAULT_ALLOWED_FILE_TYPES;
  }, [accept]);

  const validateFile = useCallback((file) => {
    if (!allowedFileTypes.includes(file.type)) {
      setError('Invalid file type');
      return false;
    }
    setError(null);
    return true;
  }, [allowedFileTypes, setError]);

  const handleFileSelection = useCallback((selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [validateFile])

  const onFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
      onChange(e)
    }
  }, [handleFileSelection, onChange])

  const removeFile = useCallback(() => {
    setFile(null)
    setError(null)
    setPreview(null)
  }, [])

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'application/pdf':
        return <FileTextIcon className="w-8 h-8 text-red-500" />;
      case 'text/csv':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return <FileSpreadsheetIcon className="w-8 h-8 text-green-500" />;
      default:
        return <FileIcon className="w-8 h-8 text-gray-500" />;
    }
  }

  useEffect(() => {
    if (reload) {
      setFile(null)
      setError(null)
      setPreview(null)
    }
  }, [reload])

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="file"
          accept={allowedFileTypes.join(',')}
          onChange={onFileInputChange}
          className="sr-only"
          id="fileInput"
          {...rest}
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => document.getElementById('fileInput')?.click()}
          className={cn(
            "flex items-center space-x-2",
            file && !error && "bg-green-100 hover:bg-green-200",
            error && "bg-red-100 hover:bg-red-200"
          )}
        >
          {file && !error ? (
            <CheckIcon className="w-4 h-4 text-green-600" />
          ) : error ? (
            <XIcon className="w-4 h-4 text-red-600" />
          ) : (
            <UploadIcon className="w-4 h-4" />
          )}
          <span>{file ? 'Change File' : 'Upload File'}</span>
        </Button>
      </div>
      {file && (
        <div className="flex items-center space-x-2">
          {preview && file.type.startsWith('image/') ? (
            <img src={preview} alt="Preview" className="object-cover w-8 h-8 rounded" />
          ) : (
            getFileIcon(file.type)
          )}
          <span className="text-sm truncate max-w-[150px]" title={file.name}>
            {file.name}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="w-8 h-8 text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
      {error && (
        <span className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
// CompactFileUploader.propTypes = {
//   onChange: PropTypes.func,
//   accept: PropTypes.string,
// }

// CompactFileUploader.defaultProps = {
//   onChange: () => {},
//   accept: undefined,
// }

// ... existing component code ...

{/**
  Usage:
  
  import { CompactFileUploader } from "@/components/custom/CompactFileUploader"

  function MyForm() {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file.name);
        // Process the file or update form state
      }
    };

    return (
      <form>
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <CompactFileUploader
            id="imageUpload"
            name="imageUpload"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="documentUpload" className="block text-sm font-medium text-gray-700">
            Upload Document (Excel or CSV)
          </label>
          <CompactFileUploader
            id="documentUpload"
            name="documentUpload"
            onChange={handleFileChange}
            accept="excel,csv"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mediaUpload" className="block text-sm font-medium text-gray-700">
            Upload Media (Image or Video)
          </label>
          <CompactFileUploader
            id="mediaUpload"
            name="mediaUpload"
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
        </div>
         //Other form fields 
        </form>
      );
    }
  */}
