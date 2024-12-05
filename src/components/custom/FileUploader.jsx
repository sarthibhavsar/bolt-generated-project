import { useState, useCallback, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PropTypes from 'prop-types';
import {
  XIcon,
  UploadIcon,
  FileIcon,
  AlertCircleIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Allowed file types
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const DEFAULT_ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

export function DropBox({ onChange = () => {}, accept, defaultValue = {}, ...rest }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const allowedFileTypes = useMemo(() => {
    if (!accept) return DEFAULT_ALLOWED_FILE_TYPES;

    const types = accept.split(",").map((type) => type.trim());
    const fileTypes = [];
    // console.log(types)
    if (types.includes("image/*")) {
      fileTypes.push("image/jpeg", "image/png", "image/gif");
    }
    if (types.includes("video/*")) {
      fileTypes.push("video/mp4", "video/mpeg", "video/quicktime");
    }
    if (types.includes("excel") || types.includes("csv")) {
      fileTypes.push(
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
      );
    }
    if (types.includes("pdf")) {
      fileTypes.push("application/pdf");
    }
    // console.log(fileTypes)
    return fileTypes.length > 0 ? fileTypes : DEFAULT_ALLOWED_FILE_TYPES;
  }, [accept]);

  const validateFile = useCallback(
    (file) => {
      if (!allowedFileTypes.includes(file.type)) {
        setError("Invalid file type");
        return false;
      }
      setError(null);
      return true;
    },
    [allowedFileTypes, setError]
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <FileTextIcon className="w-8 h-8 text-red-500" />;
      case "text/csv":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-excel":
        return <FileSpreadsheetIcon className="w-8 h-8 text-green-500" />;
      default:
        return <FileIcon className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleFileSelection = useCallback(
    (selectedFile) => {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    },
    [validateFile]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelection(droppedFile);
        onChange(e);
      }
    },
    [handleFileSelection]
  );

  const onFileInputChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelection(e.target.files[0]);
        onChange(e);
      }
    },
    [handleFileSelection, onChange]
  );

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  useEffect(() => {
    if (defaultValue.value) {
      setPreview(defaultValue.value)
      setFile({type: `image/`, name: defaultValue.name})
    }
  }, [defaultValue])

  return (
    <Card className="w-full max-w-md p-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {file ? (
        <div className="flex items-start justify-center flex-col space-x-2">
          {preview && file.type.startsWith("image/") ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full rounded h-[150px]"
            />
          ) : (
            getFileIcon(file.type)
          )}
          <div className="flex justify-start items-center gap-2">
          <span className="text-sm truncate max-w-full" title={file.name}>
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
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="p-4 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400"
        >
          <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop an image file here, or click to select a file
          </p>
          <p className="mt-1 text-xs text-gray-500">
            (Only JPEG, PNG, or GIF files are allowed)
          </p>
          <input
            type="file"
            accept={allowedFileTypes.join(",")}
            onChange={onFileInputChange}
            className="hidden"
            id="fileInput"
            {...rest}
          />
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Select File
          </Button>
        </div>
      )}
      {error && (
        <span className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </Card>
  );
}

DropBox.propTypes = {
  onChange: PropTypes.func,
  accept: PropTypes.string,
  defaultValue: PropTypes.object,
  rest: PropTypes.object,
};
